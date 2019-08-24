use std::thread;
use std::time::Duration;
use std::sync::{Mutex, Arc,RwLock};
use std::sync::mpsc;
use std::rc::Rc;
use std::cell::RefCell;

fn thread1(){
	let mut handles = vec![];
	let count = 10;

	for i in 0..count{
		//使用spawn创建线程，使用move将变量引入线程的体内
		let index = i;
		let handle = thread::spawn(move||{
			println!("thread {}",index);
		});

		//错误,我们无法将引用传递进入线程内，因为rust不确定i存活的时间是否比线程内的引用更长
		//因此，要想对线程传递变量，只能用move
		//let handle = thread::spawn(||{
		//	println!("thread {}",i);
		//});
		handles.push(handle);
	}

	//等待各线程的结束
	let _result = handles.into_iter()
		.map(|x|{
			x.join().unwrap();
			return ()
		})
		.collect::<Vec<_>>();
}

//使用消息传递在多线程间通信
fn thread2(){
	let mut message_list = vec!["a","b"];
	//mpsc::channel是异步消息，发送者发送时不阻塞，发送者发完就返回，直至内存耗尽才会报错
	//mpsc::sync_channel是同步消息，发送者受到队列的大小所控制，队列满了就会自动阻塞
	let (tx,rx) = mpsc::channel();
	let mut tx_list = vec![tx];
	//克隆发送者
	for _ in 0..message_list.len()-1{
		tx_list.push(mpsc::Sender::clone(&tx_list[0]));
	}

	let len = message_list.len();
	for _ in 0..len{
		let message = message_list.pop().unwrap();
		let tx = tx_list.pop().unwrap();

		//多个发送者同时发送内容
		thread::spawn(move||{
			for j in 0..3{
				tx.send(format!("{}_{}",message,j)).unwrap();
				thread::sleep(Duration::from_secs(1));
			}
		});
	}

	//单个接收者接收内容，注意mpsc不支持多消费者
	for received in rx {
	    println!("Got: {}", received);
	}
}

//使用共享状态在多线程间通信
fn thread3(){
	let mut handles = vec![];
	//Arc是多线程版本的Rc，Rc实现中不支持多线程的原子计数，也就是没有实现Send，无法move进多线程里面
	let mutex = Arc::new(Mutex::new(0));
	let threadCount = 5;

	for _ in 0..threadCount{
		//因为这个mutex是需要在多个线程中共享，它是需要多个所有权的，所以需要包含在Arc里面
		let thread_mutex = Arc::clone(&mutex);
		let handle = thread::spawn(move||{
			let mut data = thread_mutex.lock().unwrap();
			*data += 1
		});
		handles.push(handle);
	}

	for handle in handles{
		handle.join().unwrap();
	}

	println!("data: {}",*mutex.lock().unwrap())
}


//这是thread的闭包的要求，闭包必须能获取到所有权FnOnce，闭包自身和返回值都必须是实现了SendTrait的
//所以，你不能通过随便扔一个闭包作为参数传递给thread，它会报错的
fn go_thread<F, T>(closure:F)
	where F: FnOnce() -> T,
    	F: Send + 'static,
    	T: Send + 'static{
	let handle = thread::spawn(closure);
	handle.join();
}

fn thread4(){
	let mut data = vec![];
	{
		let closure = move ||{
			data.push(123);
			return true;
		};
		go_thread(closure);
	}
}

fn thread5(){
	let data = Rc::new(1);

	//错误，Rc没有实现Send的Trait，所以它不能move进多线程的闭包下。
	//从语法的角度看，这是因为Rc不同于普通的数据类型，它可以通过不同变量的move来实现多线程操控同一个变量，很容易造成数据竞态
	//对于普通的数据类型，i32,bool，及其构成的vec,struct等等，它们都只有一个变量拥有所有权，一旦move到某个线程后，这个线程就独占这个变量，不可能出现竞态问题
	//从语义的角度看，Rc的内部实现的计数器不是原子的，所以无法在多线程环境下实现。
	/*
	go_thread(move||{
		println!("data is {}",data);
	});
	*/

	//正确
	//从语法来看，因为Arc是满足Send trait的，所以可以安全地传递多线程环境中。但是它的Send Trait是有条件的，就是它的包含类型是Sync的。
	// 		Sync是指变量的不可变引用可以安全地在多线程环境下使用，这一般情况下都能实现呀，因为rust的基础类型都是Sync的，除了特殊的RefCell。
	//从语义来看，普通不可变引用是可以轻松用Arc包装一下就可以的，除了RefCell，因为它的表面是不可变引用，实际是运行时的可变引用检查。
	let data2 = Arc::new(23);
	thread::spawn(move||{
		println!("data is {:?}",data2);
	});

	//错误，因为Arc仅在包含类型是Sync时才是满足Send trait的，但是RefCell并不满足Sync Trait。
	/*
	let data3 = Arc::new(RefCell::new(32));
	thread::spawn(move||{
		println!("data is {:?}",data3);
	});
	*/

	//正确，因为Arc仅在包含类型是Sync时才是满足Send trait的，而RwLock仅在包含包含类型是Sync时才满足Sync Trait的，而i32满足Sync Trait的
	let data4 = Arc::new(RwLock::new(32));
	thread::spawn(move||{
		println!("data is {:?}",data4);
	});

	//正确，因为Arc仅在包含类型是Sync时才是满足Send trait的，而Mutex仅在包含包含类型是Sync时才满足Sync Trait的，而i32满足Sync Trait的
	let data5 = Arc::new(Mutex::new(32));
	thread::spawn(move||{
		println!("data is {:?}",data5);
	});
}


fn main(){
	thread1();
	thread2();
	thread3();
	thread4();
	thread5();
}
