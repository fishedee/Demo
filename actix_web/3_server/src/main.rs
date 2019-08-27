use actix::prelude::*;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};

fn run1() {
    let sys = actix::System::new("example");

    HttpServer::new(|| {
        App::new().route("/", web::get().to(|| {
            "Hello World"
        }))
    })
    .bind("127.0.0.1:8088")
    .unwrap()
    //使用start方式启动actor，返回的是addr，可以根据获得的addr进行pause,resume,stop的操作
    .start();

    //sys.run执行事件循环
    let _ = sys.run();
}

fn run2(){
    HttpServer::new(||{
        App::new()
            .route("/",web::get().to(||{
               "Hello World2"
            }))
    })
    //启动4个线程
    .workers(4)
    .bind("127.0.0.1:8088")
    .unwrap()
    //以阻塞的方式启动
    .run()
    .unwrap();
}

fn main(){
    run2();
}