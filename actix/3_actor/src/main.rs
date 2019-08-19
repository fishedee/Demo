use std::io;
use actix::prelude::*;
use futures::future;

//定义消息1
struct Ping;

impl Message for Ping {
    type Result = Result<bool, io::Error>;
}

//定义消息2
struct Hello;
impl Message for Hello{
    type Result = String;
}

//定义actor
struct MyActor;

//提供Actor的默认实现，started与stopped是默认生命周期回调
impl Actor for MyActor {
    type Context = Context<Self>;

    fn started(&mut self, ctx: &mut Context<Self>) {
       println!("Actor is alive");
    }

    fn stopped(&mut self, ctx: &mut Context<Self>) {
       println!("Actor is stopped");
    }
}

//定义MyActor关于消息1的处理方式
impl Handler<Ping> for MyActor {
    //获得消息结果后如何response，Result默认实现了MessageResponse
    type Result = Result<bool, io::Error>;

    fn handle(&mut self, msg: Ping, ctx: &mut Context<Self>) -> Self::Result {
        println!("Ping received");

        Ok(true)
    }
}

//定义MyActor关于消息2的处理方式
impl Handler<Hello> for MyActor {
    //获得消息结果后如何response，Result默认实现了MessageResponse
    type Result = String;

    fn handle(&mut self, msg: Hello, ctx: &mut Context<Self>) -> Self::Result {
        return "Fine,I am thank you".to_string();
    }
}

fn main() {
    let sys = System::new("example");

    //启动actor
    let addr = MyActor.start();

    //发送消息1，返回的是future
    let result1 = addr.send(Ping{});

    //复制地址2
    let addr2 = addr.clone();

    let re = result1.map(|res| {
            //返回消息1的结果
            match res {
                Ok(result) => println!("Got result1: {}", result),
                Err(err) => println!("Got error: {}", err),
            }
        })
        .and_then(move|res|{
            //发送消息2，返回的是future
            return addr2.send(Hello{});
        })
        .map(|res|{
            //返回消息2的结果
            println!("Got result2: {}",res);
            System::current().stop();
            return ();
        })
        .map_err(|e|{
            println!("Actor is probably died: {}", e);
            return ();
        });

    //Arbiter的spawn是执行一个Future，其Item和Error都是()类型的Future
    Arbiter::spawn(re);

    //真正地运行所有的Actor
    sys.run();
}