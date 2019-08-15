use std::sync::{Mutex, Arc,RwLock};
use std::thread;
use std::cell::RefCell;
use std::time;

fn main(){
	let data:String = "hello".to_string();

	let data2:String = "hello2".to_string();

	let rc1 = Arc::new(Mutex::new(data));
	let rc2 = Arc::clone(&rc1);

	let mc1 = Arc::new(Mutex::new(data2));
	let mc2 = Arc::clone(&mc1);


	let thread1 = thread::spawn(move||{
		let mut data_ref = rc1.lock().unwrap();
		//加入强制等待1秒
		thread::sleep(time::Duration::new(1, 0));

		let mut data_ref2 = mc1.lock().unwrap();
		data_ref.push_str("_a");
		data_ref2.push_str("_b");
		println!("exit one! data:{},data2:{}",data_ref,data_ref2);
	});

	let thread2 = thread::spawn(move||{
		let mut data_ref = rc2.lock().unwrap();
		//加入强制等待1秒
		thread::sleep(time::Duration::new(1, 0));

		let mut data_ref2 = mc2.lock().unwrap();
		data_ref.push_str("_a");
		data_ref2.push_str("_b");
		println!("exit two! data:{},data2:{}",data_ref,data_ref2);
	});

	thread1.join().unwrap();
	thread2.join().unwrap();
}