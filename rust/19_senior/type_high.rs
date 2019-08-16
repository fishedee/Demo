//类型别名
//使用Box包装闭包，同时闭包里面用Fn()+Send+'static
type Thunk = Box<dyn Fn() + Send + 'static>;

fn takes_long_type(f: Thunk) {
	f();
}

fn returns_long_type() -> Thunk {
	return Box::new(||{
		println!("mc")
	})
}

fn run1(){
	let t = returns_long_type();
	takes_long_type(t);
}

//使用fn代表函数指针
fn add_one(x: i32) -> i32 {
    x + 1
}

//只能传递函数指针，和无引用的闭包
fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

//使用Box，可以传递函数指针，和任意的闭包
fn do_twice2(f:Box<dyn Fn(i32)->i32>,arg:i32)->i32{
	f(arg) + f(arg)
}

//使用模板，可以传递函数指针，和任意的闭包
fn do_twice3<T>(f:T,arg:i32) -> i32
	where T:Fn(i32)->i32{
	f(arg) + f(arg)
}

fn run2(){
	let outer = 3;

	let _ = do_twice(add_one,5);
	let _ = do_twice(|x|x+2,5);
	//错误，无法传递带引用的闭包
	//let _ = do_twice(|x|{x+outer},5);

	let _ = do_twice2(Box::new(add_one),5);
	let _ = do_twice2(Box::new(|x|x+2),5);
	let _ = do_twice2(Box::new(move|x|{x+outer}),5);

	let _ = do_twice3(add_one,5);
	let _ = do_twice3(|x|x+2,5);
	let _ = do_twice3(|x|{x+outer},5);
}

pub fn run(){
	run1();
	run2();
}