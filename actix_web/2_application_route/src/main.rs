use actix_web::{web, App, HttpResponse, HttpServer, Responder,guard};

fn index() -> impl Responder {
    HttpResponse::Ok().body("index1!")
}

fn index2() -> impl Responder {
    HttpResponse::Ok().body("index2!")
}

fn index3() -> impl Responder {
    HttpResponse::Ok().body("index3!")
}
fn main() {
	//要注意，actix_web的匹配是按顺序的匹配方式，排在前面的优先被匹配
    HttpServer::new(||{
    		return App::new()
		    	//service的用法是划分多个配置区域，不同区域下的配置不同
		    	.service(
		    		//scope是设置匹配的前缀，满足/app2前缀的就会被匹配
		            web::scope("/app2")
		            	//route是精确匹配，路径完全匹配/的才会被匹配
		                .route("/", web::to(index2))
		        )
		        .service(
		            web::scope("/app1")
		                .route("/mc", web::to(index))
		        )
		        //这个无法被匹配，因为被service下的/app1拦截了。
		        .route("/app1", web::to(index3))
		        .service(
		        	//scope是设置匹配的前缀，满足/前缀的就会被匹配
	                web::scope("/")
	                	//但是加了guard，指定只有Host为idc.fishedee.com的才会被匹配
	                    .guard(guard::Header("Host", "idc.fishedee.com:8088"))
	                    .route("", web::to(index)),
	            )
	            //当Host不为idc.fishedee.com的时候就能匹配
	            .route("/", web::to(index2));
		        
    	})
       	.bind("0.0.0.0:8088")
		.unwrap()
		.run()
		.unwrap();
}