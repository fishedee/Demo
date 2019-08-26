use actix_web::{web, App, HttpResponse, HttpServer, Responder,guard};
use std::sync::Mutex;

#[derive(Clone)]
struct AppState{
	app_name:String
}

fn index(data:web::Data<AppState>)->String{
	let app_name = &data.app_name;
	return format!("Hello {}!",app_name);
}

struct AppState2{
	counter:Mutex<i32>,
}

fn index2(data:web::Data<AppState2>)->String{
	let mut counter = data.counter.lock().unwrap();
	*counter += 1;
	return format!("Request number:{}",counter);
}

fn main() {
	let appState = AppState{
		app_name:"fish".to_string(),
	};

	//web::Data其实是Arc容器
	let appState2 = web::Data::new(AppState2{
		counter:Mutex::new(0),
	});

    HttpServer::new(move||{
    		panic!("zx");
    		println!("start app {:p}",&appState2);
    		return App::new()
    			.register_data(appState2.clone())
		    	.service(
		            web::scope("/app1")
		            	//data传入不可变数据，传入后actix用web::Data包装起来
		            	.data(appState.clone())
		                .route("/", web::to(index))
		        )
		        .service(
		            web::scope("/app2")
		            	//register_data传入可变数据，传入后actix直接使用
		            	
		                .route("/", web::to(index2))
		        );
		        
    	})
    	.workers(4)
       	.bind("0.0.0.0:8088")
		.unwrap()
		.run()
		.unwrap();

	//println!("{:p}",&appState2);
}