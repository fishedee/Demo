use std::io::prelude::*;
use std::net::TcpStream;
use std::net::TcpListener;
use std::fs;

use std::thread::JoinHandle;
use std::thread;
use std::sync::{Mutex, Arc};
use std::sync::mpsc;


fn handle_connection(mut stream: TcpStream){
	let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();

    let get = b"GET / HTTP/1.1\r\n";

    let (status_line, filename) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK\r\n\r\n", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "404.html")
    };
    let contents = fs::read_to_string(filename).unwrap();

    let response = format!("{}{}", status_line, contents);

    println!("write data {}",response);
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

type Job = Box<dyn FnOnce()+Send+'static>;

struct ThreadPool{
	workers:Vec<Worker>,
	sender:mpsc::Sender<Job>,
}

impl ThreadPool{
	fn new(thread_count:u32) -> ThreadPool{
		if thread_count < 1{
			panic!(format!("invalid thread_count {}",thread_count))
		}
		let (sender,receiver) = mpsc::channel();
		let mutex = Arc::new(Mutex::new(receiver));

		let mut workers = Vec::new();
		for i in 0..thread_count{
			let worker_mutex = Arc::clone(&mutex);
			let worker = Worker::new(i,worker_mutex);
			workers.push(worker);
		}

		return ThreadPool{
			workers:workers,
			sender:sender,
		}
	}

	fn run<T>(&self,f:T)->()
		where T:FnOnce()+Send+'static{
		self.sender.send(Box::new(f)).unwrap();
	}
}

struct Worker{
	handler:JoinHandle<()>,
}

impl Worker{
	fn new(id:u32,mutex:Arc<Mutex<mpsc::Receiver<Job>>>)->Worker{
		let handler = thread::spawn(move||{
			loop{
				let job = mutex.lock().unwrap().recv().unwrap();
				println!("worker {} run...",id);
				job();
			}
		});
		return Worker{
			handler:handler
		}
	}
}

#[derive(Debug)]
struct Uc{}
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let thread_pool = ThreadPool::new(8);
   

    for stream in listener.incoming() {
        let stream = stream.unwrap();

		thread_pool.run(||{
			handle_connection(stream);
		});
    }
}
