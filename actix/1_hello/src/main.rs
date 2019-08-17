use actix::prelude::*;

//定义消息
struct Ping(usize);

impl Message for Ping {
    type Result = usize;
}

//定义消息处理器，就是actor
struct MyActor {
    count: usize,
}

impl Actor for MyActor {
    type Context = Context<Self>;
}

impl Handler<Ping> for MyActor {
    type Result = usize;

    fn handle(&mut self, msg: Ping, _ctx: &mut Context<Self>) -> Self::Result {
        self.count += msg.0;

        self.count
    }
}

fn main() -> std::io::Result<()> {
    let system = System::new("test");

    //启动一个actor，返回的是Addr,Request<MyActor,Ping>
    let addr = MyActor{count: 10}.start();

    //发送消息，强类型，addr是Request<MyActor,Ping>类型，send函数只接受Ping类型
    let res = addr.send(Ping(10));

    Arbiter::spawn(
        res.map(|res| {
            println!("RESULT: {}", res == 20);
        })
        .map_err(|_| ()));

    system.run()
}