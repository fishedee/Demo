use actix_web::{web, App, HttpResponse, HttpServer, Responder};

fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

fn main() {
	//要注意，actix_web的匹配是按照顺序匹配的，如果/设置在前面的话，那会block掉后面所有的配置
    App::new()
    	//service的用法是划分多个配置区域，不同区域下的配置不同
        .service(
        	//scope是设置匹配的前缀
            web::scope("/app1")
                .route("/", web::to(|| HttpResponse::Ok())))
        .service(
            web::scope("/app2")
                .route("/", web::to(|| HttpResponse::Ok())))
        .route("/", web::to(|| HttpResponse::Ok()));
}