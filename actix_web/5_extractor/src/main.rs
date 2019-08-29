use actix_web::{web, Result,App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
use actix_web::FromRequest;
use actix_web::HttpRequest;

//获取path的参数，通过tunple
//当第二个参数不是整数时，会报404错误
fn index(info: web::Path<(u32, String)>) -> Result<String> {
    Ok(format!("path is /{}/{}!", info.0, info.1))
}

#[derive(Deserialize)]
struct Info {
    userid: u32,
    friend: String,
}

//获取path参数，通过struct
//当第二个参数不是整数时，会报404错误
fn index2(info: web::Path<Info>) -> Result<String> {
    Ok(format!("path is /{}/{}!", info.userid, info.friend))
}

#[derive(Deserialize)]
struct Info3 {
    username: String,
    userid:Option<u32>,
}

//获取query参数，通过struct
//当缺少username参数的时候，报400错误
//当缺少userid参数的时候，不会报错，但值是None
//当userid参数不能转换为i32的时候，会报400错误
fn index3(info: web::Query<Info3>) -> Result<String> {
    Ok(format!("query is username={},userid={:?}",info.username,info.userid))
}

#[derive(Deserialize)]
struct Info4 {
    username: String,
}

//获取form参数，url-encoded的，通过struct
//当content-type不是x-www-form-urlencoded的时候，报400错误
//当缺少username参数的时候，报400错误
fn index4(info: web::Form<Info4>) -> Result<String> {
    Ok(format!("form[url] is username={}",info.username))
}

#[derive(Deserialize)]
struct Info5 {
    username: String,
}

//获取form参数，json-encoded的，通过struct
//当content-type不是application/json，报400错误
//当缺少username参数的时候，报400错误
fn index5(info: web::Json<Info5>) -> Result<String> {
    Ok(format!("form[json] is username={}",info.username))
}

#[derive(Deserialize)]
struct Info6 {
    username: String,
}

//直接从request中读取数据
fn index6(req: HttpRequest)->Result<String>{
    let params = web::Path::<(String, String)>::extract(&req)?;

    let info = web::Query::<Info6>::extract(&req)?;

    Ok(format!("params: {},{},query:{}",params.0,params.1,info.username))
}



fn main() {
    HttpServer::new(|| {
        App::new()
            .route("/1/{userid}/{friend}", web::get().to(index))
            .route("/2/{userid}/{friend}", web::get().to(index2))
            .route("/3",web::get().to(index3))
            .route("/4",web::post().to(index4))
            .route("/5",web::post().to(index5))
            .route("/6/{friend1}/{friend2}",web::get().to(index6))
    })
    .bind("0.0.0.0:8088")
    .unwrap()
    .run()
    .unwrap();
}