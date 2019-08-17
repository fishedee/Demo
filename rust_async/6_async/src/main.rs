#![feature(async_await)]
mod time_future;
use futures::executor::block_on;
use futures::Future;
use time_future::TimerFuture;
use std::time::Duration;
use std::rc::Rc;

async fn foo() -> u8 { 5 }

fn easy1() -> impl Future<Output = u8> {
    async {
        let x: u8 = foo().await;
        x + 7
    }
}

fn borrow_x(x:&i32){
	println!("x = {}",x);
}

fn borrow_y(y:&str){
	println!("y = {}",y)
}

fn borrow_bad() -> impl Future<Output = u8> {
    let x = 5;
    async {
    	//错误，async执行可能与let x=5在不同的线程间执行，生命周期不匹配，无法编译
    	//borrow_x(&x);
    	return 7;
    }
}

fn borrow_good() -> impl Future<Output = u8> {
    async {
    	let x = 5;
    	//正确，async执行与let x= 5肯定在同一个线程间，生命周期匹配，可以编译
    	borrow_x(&x);
    	return 7;
    }
}

fn move_good() -> impl Future<Output = u8> {
    let y = "abc".to_string();
    async move {
    	//正确，async执行将y直接move到本线程，没问题
    	borrow_y(&y);
    	return 7;
    }
}

async fn go_next(y:&str)->String{
	let mut m = y.to_string();
	TimerFuture::new(Duration::new(2,0)).await;
 	m.push_str("_cg");
 	return m;
}

fn await_good()->impl Future<Output = u8>{
	async {
		let y = Rc::new("abc".to_string());
		let d = go_next(&y).await;

		borrow_y(&d);

		return 8;
	}
}

fn main() {
    let future = easy1();
    println!("no run,no print");
    let data = block_on(future);
    println!("{}",data)
}