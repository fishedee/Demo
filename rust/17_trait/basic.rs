use std::fmt::Display;

//声明一个trait
pub trait UI{
	fn draw(&self);
}

pub struct Circle{
	pub radius:f32
}

//实现一个trait的两种办法
//在struct的声明里面实现这个trait
impl UI for Circle{
	fn draw(&self){
		println!("draw cricle [raidus:{}]",self.radius);
	}
}

pub struct Square{
	length:f32
}

impl UI for Square{
	fn draw(&self){
		println!("draw square [length:{}]",self.length);
	}
}

//与golang,java不同的是，trait不仅描述的是类型自身的属性，是否包含一些指定的方法
//trait还可以通过模板结合成为类型的装饰器，为类型提供新的方法和功能
pub trait PdfUI{
	fn print(&self);

	//trait里面还可以提供默认实现
	fn print_debug(&self){
		println!("debug begin!");
		self.print();
		println!("debug end!");
	}
}

//实现一个trait的另外一个办法
//在trait的声明里面实现了这个trait
impl<T> PdfUI for T
	where T:UI{
	fn print(&self){
		println!("print begin!");
		self.draw();
		println!("print end!");
	}
}

//trait里面可以指定一个范型类型，同时，不同Printer Type下的trait依然属于同一个My Print的trait，注意和MyPrint<T>的不同
pub trait MyPrint{
	//trait的type，后面代表，这个type必须满足的trait
	type Printer:Display;

	fn go(&self,a:&Self::Printer);
}


pub struct ConsoleInt{

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


pub trait Mul<T>{
	type ResultType:Clone;

	fn mul(self,right:T)->Self::ResultType;
}

impl Mul<i32> for i32{
	type ResultType = f64;

	fn mul(self,right:i32)->Self::ResultType{
		return (self*right) as f64
	}
}

/*
错误，无法定义仅仅是ResultType不一样的Mul<i32>，因为Mul<i32>的trait已经定义过了
impl Mul<i32> for i32{
	type ResultType = f32;

	fn mul(self,right:i32)->Self::ResultType{
		return (self*right) as f32
	}
}
*/

impl Mul<f64> for f64{
	type ResultType = f64;

	fn mul(self,right:f64)->Self::ResultType{
		return (self * right);
	}
}

//无范型参数的trait
fn run1(){
	let circle = Circle{radius:12.1};
	circle.draw();
	//通过impl trait 获取得到的方法
	circle.print();
	circle.print_debug();
}

//含范型参数的trait
fn run2(){
	let a1 = ConsoleInt{};
	let a2 = 333;
	a1.go(&a2);

	let b1 = 123;
	let b2 = 789;
	println!("{}*{} = {}",b1,b2,b1.mul(b2));

	let c1 = 123.1 as f64;
	let c2 = 789.2 as f64;
	println!("{}*{} = {}",c1,c2,c1.mul(c2));
}

pub fn go(){
	run1();
	run2();
}