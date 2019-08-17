#![feature(async_await)]
use futures::executor::block_on;

async fn hello_world() {
    println!("hello, world!");
}

fn main() {
    let future = hello_world();
    //和node不同的是，执行async函数不会导致函数执行，需要指定block_on才会启动函数
    println!("no run,no print");
    block_on(future);
}