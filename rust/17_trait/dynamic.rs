
//trait对象在rust中既作为静态分发（模板）的类型共性描述，也是动态分发(类似golang的interface)的类型共性描述
trait Animal{
	fn Call(&self);

	//与golang的interface不同的是，它的共性描述可以附带默认实现的
	fn Call_With_log(&self){
		println!("call begin!");
		self.Call();
		println!("call end!");
	}
}

#[derive(Debug)]
struct Dog{

}

impl Animal for Dog{
	fn Call(&self){
		println!("dog call!");
	}
}

#[derive(Debug)]
struct Cat{

}

impl Animal for Cat{
	fn Call(&self){
		println!("cat call!");
	}
}

#[derive(Debug)]
struct Fish{
}

impl Animal for Fish{
	fn Call(&self){
		println!("fish call!");
	}

	//Fish可以覆盖默认实现
	fn Call_With_log(&self){
		println!("--- call begin! ---");
		self.Call();
		println!("--- call end! ---");
	}
}	

fn go1(data:Box<dyn Animal>){
	data.Call_With_log();
}

//impl 的写法实际上是静态分发，它是相当于
//fn go2<T:Animal>(data:T)的简写，但是，它和直接写模板不一样的是，它屏蔽了参数与返回值的具体类型，无法往下传递这个实际的类型。
fn go2(data:impl Animal){
	data.Call_With_log();
}

fn go3(data:&dyn Animal){
	data.Call_With_log();
}

fn getAnimal(data:i32)->Box<dyn Animal>{
	if data == 1{
		return Box::new(Dog{})
	}else{
		return Box::new(Cat{});
	}
}

fn getAnimal2(data:i32)->impl Animal{
	if data == 1{
		return Dog{};
	}else{
		//错误，impl是静态分发，无法返回两个不同的具体类型
		//return Cat{};
		return Dog{};
	}
}

fn run1(){
	//rust将trait用作动态方法时，有三种方法
	let a = Dog{};
	let b = Cat{};
	let c = Fish{};

	//使用Box包装，Box里面获取原始类型的所有权，内存分配在堆上，真正的动态分发
	go1(Box::new(a));

	//使用impl包装，impl里面获取原始类型的所有权，内存分配在栈上，本质上是静态分发
	go2(b);

	//使用引用包装，仅获取了它的借用，没有所有权，动态分发
	go3(&c);

	//错误，a和b，已经move了，无法再使用了
	//println!("a = {:?} , b = {:?}",a,b);

	//正确，c可以正常使用
	println!("c = {:?}",c);
}

fn run2(){
	let a = Dog{};
	let b = Cat{};
	let c = Fish{};

	let list:Vec<Box<dyn Animal>> = vec![
		Box::new(a),
		Box::new(b),
		Box::new(c),
	];

	for data in list{
		go1(data);
	}
}

fn run3(){
	let a = Dog{};
	let b = Cat{};
	let c = Fish{};

	let list:Vec<&dyn Animal> = vec![
		&a,
		&b,
		&c,
	];

	for data in list{
		go3(data);
	}
}

fn run4(){
	let data = getAnimal(2);
	data.Call();

	let data2 = getAnimal2(1);
	data2.Call();
}


pub fn go(){
	run1();
	run2();
	run3();
	run4();
}