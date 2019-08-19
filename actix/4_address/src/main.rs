use std::time::Duration;
use actix::prelude::*;

#[derive(Message)]
struct Ping { pub id: usize }

// Actor definition
struct Game {
    counter: usize,
    //对某个地址执行recipient就可以获得Recipient<T>
    addr: Recipient<Ping>,
}

impl Actor for Game {
    type Context = Context<Game>;
}

// simple message handler for Ping message
impl Handler<Ping> for Game {
    type Result = ();

    fn handle(&mut self, msg: Ping, ctx: &mut Context<Self>) {
        self.counter += 1;

        if self.counter > 10 {
            System::current().stop();
        } else {
            println!("Ping received {:?}", msg.id);

            // wait 100 nanos
            ctx.run_later(Duration::new(0, 100), move |act, _| {
                act.addr.do_send(Ping{id: msg.id + 1});
            });
        }
    }
}

fn main() {
    let system = System::new("test");

    // To get a Recipient object, we need to use a different builder method
    // which will allow postponing actor creation
    let addr = Game::create(|ctx| {
        // now we can get an address of the first actor and create the second actor
        let addr = ctx.address();
        let addr2 = Game{counter: 0, addr: addr.recipient()}.start();

        // let's start pings
        addr2.do_send(Ping{id: 10});

        // now we can finally create first actor
        Game{counter: 0, addr: addr2.recipient()}
    });

    system.run();
}