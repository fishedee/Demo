#![feature(async_await)]

//Fucture的简化定义版本，外部可以不断执行poll来轮询Future是否有结果
//有结果的时候，返回Poll<T>::Ready<T>
//没有结果的时候，返回Poll<T>::Pending。
//至于poll为什么会有wake函数，是因为我们约定好，当poll返回Pending的时候，它也会保存wake，一旦有结果就调用wake来通知调用方有结果可以拿，避免无数次的轮询。

//注意，poll在返回Pending的时候，不作为推动工作的触发，因为poll是轮询的，同一个状态可能会查询多次，如果作为推动工作的触发，就会同一个事情可能触发多次执行。
//poll的实现必须为查询的语义，和记录wake的语义
enum Poll<T>{
	Ready(T),
	Pending,
}
trait SimpleFuture{
	type Output;
	fn poll(&mut self,wake:fn())->Poll<Self::Output>;
}

//组合两个Future成为新的Future，Future之间采取并行执行
pub struct Join<FutureA, FutureB> {
    //a与b代表两个Future，Option表示，当其中执行完成了，就是None，否则是Some
    a: Option<FutureA>,
    b: Option<FutureB>,
}

impl<FutureA, FutureB> SimpleFuture for Join<FutureA, FutureB>
where
    FutureA: SimpleFuture<Output = ()>,
    FutureB: SimpleFuture<Output = ()>,
{
    type Output = ();
    fn poll(&mut self, wake: fn()) -> Poll<Self::Output> {
        if let Some(a) = &mut self.a {
            if let Poll::Ready(()) = a.poll(wake) {
                self.a.take();
            }
        }

        if let Some(b) = &mut self.b {
            if let Poll::Ready(()) = b.poll(wake) {
                self.b.take();
            }
        }

        if self.a.is_none() && self.b.is_none() {
        	//两个都完成的时候，返回Ready
            Poll::Ready(())
        } else {
           	//任意一个未完成的时候，返回Pending
            Poll::Pending
        }
    }
}

//组合两个Future成为新的Future，Future之间采取串行执行
pub struct AndThenFut<FutureA, FutureB> {
    first: Option<FutureA>,
    second: FutureB,
}

impl<FutureA, FutureB> SimpleFuture for AndThenFut<FutureA, FutureB>
where
    FutureA: SimpleFuture<Output = ()>,
    FutureB: SimpleFuture<Output = ()>,
{
    type Output = ();
    fn poll(&mut self, wake: fn()) -> Poll<Self::Output> {
        if let Some(first) = &mut self.first {
            match first.poll(wake) {
                //第一个任务已经完成了，那就设置一下为已经完成了
                Poll::Ready(()) => self.first.take(),
                //第一个任务还没完成，那就直接返回，不触发第二个任务
                Poll::Pending => return Poll::Pending,
            };
        }
        
        //触发第二个任务
        self.second.poll(wake)
    }
}

fn main(){

}