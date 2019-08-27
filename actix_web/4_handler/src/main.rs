use actix_web::{HttpServer,App};
mod sync_handler;
mod async_handler;

fn main() {
    HttpServer::new(|| {
        App::new()
            .configure(sync_handler::config)
            .configure(async_handler::config)
    })
    .bind("0.0.0.0:8088")
    .unwrap()
    .run()
    .unwrap();
}