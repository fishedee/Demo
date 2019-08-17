#![feature(async_await)]
use {
    hyper::{
        // Miscellaneous types from Hyper for working with HTTP.
        Body, Client, Request, Response, Server, Uri,

        // This function turns a closure which returns a future into an
        // implementation of the the Hyper `Service` trait, which is an
        // asynchronous function from a generic `Request` to a `Response`.
        service::service_fn,

        // A function which runs a future to completion using the Hyper runtime.
        rt::run,
    },
    futures::{
        // Extension trait for futures 0.1 futures, adding the `.compat()` method
        // which allows us to use `.await` on 0.1 futures.
        compat::Future01CompatExt,
        // Extension traits providing additional methods on futures.
        // `FutureExt` adds methods that work for all futures, whereas
        // `TryFutureExt` adds methods to futures that return `Result` types.
        future::{FutureExt, TryFutureExt},
    },
    std::net::SocketAddr,
};

/*
简单的直接返回
async fn serve_req(_req:Request<Body>)->Result<Response<Body>,hyper::Error>{
	return Ok(Response::new(Body::from("hello world!")));
}
*/

async fn serve_req(req:Request<Body>)->Result<Response<Body>,hyper::Error>{
	println!("Got request at {:?}", req.uri());
	let url_str = "http://www.rust-lang.org/en-US/";
	let url = url_str.parse::<Uri>().expect("failed to parse URL");
	let res = Client::new().get(url).compat().await;
	println!("request finished-- returning response");
	return res;
} 


async fn run_server(addr:SocketAddr){
	println!("Listen on http://{}",addr);

	let serve_future = Server::bind(&addr)
		.serve(||{
			service_fn(|req|{
				//boxed.compat 是固定用法，将future3版本转换为future1版本
				serve_req(req).boxed().compat()
			})
		});

	if let Err(e) = serve_future.compat().await{
		eprintln!("server error:{}",e)
	}
}


fn main() {
    let addr = SocketAddr::from(([127,0,0,1],3000));

    let future3 = run_server(addr);
    let future1 = future3.unit_error().boxed().compat();

    run(future1);
}