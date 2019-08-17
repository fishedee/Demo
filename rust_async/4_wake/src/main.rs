#![feature(async_await)]

use {
    std::{
        future::Future,
        pin::Pin,
        sync::{Arc, Mutex},
        task::{Context, Poll, Waker},
        thread,
        time::Duration,
    },
};

pub struct TimerFuture{
    shared_state:Arc<Mutex<SharedState>>,
}

struct SharedState{
    completed:bool,
    waker:Option<Waker>,
}

impl Future for TimerFuture{
    type Output = ();
    fn poll(self:Pin<&mut Self>,ctx:&mut Context<'_>)->Poll<Self::Output>{
        let mut shared_state = self.shared_state.lock().unwrap();

        if shared_state.completed{
            return Poll::Ready(());
        }else{
            //为什么要不断更新waker，因为Future可能在不同线程间迁移，有时候在线程A轮询，有时候在线程B轮询，不同线程下的waker是不一样的
            shared_state.waker = Some(ctx.waker().clone());
            return Poll::Pending;
        }
    }
}
impl TimerFuture{
    //new的时候才是触发动作的时机
    pub fn new(duration:Duration)->Self{
        let shared_state = Arc::new(Mutex::new(SharedState{
            completed:false,
            waker:None,
        }));

        let thread_shared_state = shared_state.clone();

        thread::spawn(move||{
            thread::sleep(duration);

            let mut shared_state = thread_shared_state.lock().unwrap();

            shared_state.completed = true;

            //取出waker的数据，然后放入if let里面做模式匹配，这时候的Some(waker)的waker获取了所有权
            if let Some(waker) = shared_state.waker.take(){
                waker.wake();
            }
        });
        return TimerFuture{
            shared_state:shared_state,
        }
    }
}

fn main(){

}