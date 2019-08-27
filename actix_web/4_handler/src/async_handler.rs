#![feature(async_await)]

use actix_web::{web,Error, HttpRequest, HttpResponse, Responder};
use futures::future::{ok, Future};

//异步handler的特点是，不直接返回Responder，而是返回被Future包装过的Respondor，什么时候Future有结果了，就通知actix自己去取结果，反正最终结果肯定是Respondor类型的。
//返回的类型必须满足IntoFuture<Item,Error>的trait，同时Item满足Respondor的trait，Error满足Into<Error>的trait
fn index() -> Box<dyn Future<Item = HttpResponse, Error = Error>> {
    Box::new(ok::<_, Error>(
        HttpResponse::Ok().content_type("text/html").body("Hello!"),
    ))
}

//为什么要用Box<dyn Future>来包装，因为Future是一个trait，要么用impl Future来静态分发返回，要么用Box<dyn Future>来返回
//否则这个函数就是unknown sized的。
fn index2() -> impl Future<Item = String, Error = Error> {
    ok::<_, Error>("Welcome!".to_string())
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/dog")
        	//使用异步的handler的时候，用的是to_async，而不是to
            .route("/1",web::get().to_async(index))
            .route("/2",web::get().to_async(index2))
    );
}

//FIXME，注意，目前actix_web使用的仍然是future 0.1版本，无法使用async,await包装的future。