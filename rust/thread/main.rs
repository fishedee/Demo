use std::thread;
use std::time::Duration;
use std::sync::mpsc;

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

fn thread2(){
	let mut message_list = vec!["a","b"];
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


fn main(){
	thread1();
	thread2();
}
