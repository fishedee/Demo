use actix_web::{web,Error, HttpRequest, HttpResponse, Responder};
use serde::Serialize;
use std::io::Bytes;

//actix_web要求返回类型都是满足Responder的trait
fn index(_req: HttpRequest) -> impl Responder {
    "index"
}

//默认&str就满足了Responder的trait
fn index2(_req: HttpRequest) -> &'static str  {
    "index2!"
}

//默认String就满足了Responder的trait
fn index3(_req: HttpRequest) -> String {
    "index3".to_string()
}

//默认Result就满足了Responder的trait
//注意要在Result<T,R>中的T满足Responder的trait，R满足Into<Error>的trait的情况下
//整体Result<T,R>才能满足Responder的trait
fn index4(_req: HttpRequest) -> Result<String,Error> {
    Ok("index4".to_string())
}

#[derive(Serialize)]
struct MyObj{
	name:String,
	age:i32,
}

impl Responder for MyObj{
	//Error要满足Into<Error>的trait
	type Error = Error;

	//Future要满足IntoFuture<Item=HttpResponse,Error=Self::Error>的trait
	type Future = Result<HttpResponse,Error>;

	fn respond_to(self,_req:&HttpRequest)->Self::Future{
		let body = serde_json::to_string(&self)?;

		Ok(HttpResponse::Ok()
			.content_type("application/json")
			.body(body))
	}
}

//自定义类型满足Responder的trait
fn index5() -> impl Responder{
	MyObj{
		name:"fish".to_string(),
		age:30,
	}
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/cat")
            .route("/1",web::get().to(index))
            .route("/2",web::get().to(index2))
            .route("/3",web::get().to(index3))
            .route("/4",web::get().to(index4))
            .route("/5",web::get().to(index5))
    );
}