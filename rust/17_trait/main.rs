
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

struct Dog{

}

impl Animal for Dog{
	fn Call(&self){
		println!("dog call!");
	}
}

struct Cat{

}

impl Animal for Cat{
	fn Call(&self){
		println!("cat call!");
	}
}

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

fn run1(){
	//在rust中存放动态分发的抽象，必须用Box容器，类型为dyn XXX
	let mut a:Vec<Box<dyn Animal>> = Vec::new();

	a.push(Box::new(Dog{}));
	a.push(Box::new(Cat{}));
	a.push(Box::new(Fish{}));

	for animal in a.iter(){
		animal.Call_With_log();
	}

	//一旦某个类型实现了trait以后，它就能将trait的方法据为己用
	let b = Dog{};

	b.Call_With_log();
}

use std::fmt::Display;

trait MyPrint{
	//trait的type，后面代表，这个type必须满足的trait
	type Printer:Display;

	fn go(&self,a:&Self::Printer);
}


struct ConsoleInt{

}

impl MyPrint for ConsoleInt{
	type Printer = i32;

	fn go(&self,a:&Self::Printer){
		println!("ConsoleInt Print {}",a)
	}
}

/*
//失败，因为Printer是Fish类型，而Fish类型不满足Display的trait
struct ConsoleFish{

}

impl MyPrint for ConsoleFish{
	type Printer = Fish;

	fn go(&self,a:&Self::Printer){
		println!("ConsoleFish Print {}",a)
	}
}
*/


fn run2(){
	let data:i32 = 68;
	let console = ConsoleInt{};
	console.go(&data);
}

fn main(){
	run1();

	run2();
}