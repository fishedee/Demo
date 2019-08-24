use actix_web::{web, App, HttpResponse, HttpServer, Responder};

//Responder是trait，这是静态分发的写法
fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

fn index2() -> impl Responder {
    HttpResponse::Ok().body("Hello world again!")
}

fn main() {
    HttpServer::new(|| {
        App::new()
        	//匹配get请求的/路径
            .route("/", web::get().to(index))
            //匹配get请求的/again路径
            .route("/again", web::get().to(index2))
    })
    .bind("127.0.0.1:8088")
    .unwrap()
    .run()
    .unwrap();
}