
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

fn main(){
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