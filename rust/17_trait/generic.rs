use super::basic::*;

//在generic中指定泛型必须满足的trait
fn g1<T:UI>(a:T){
	a.draw();
}

//在generic中指定泛型必须满足的trait，并利用trait内含的泛型type作为参数与返回值
fn g2<'a,T:MyPrint>(a:&'a T,b:&'a T::Printer)->&'a T::Printer{
	a.go(b);
	return b;
}

//在generic中指定泛型必须满足的trait，对于泛型trait，我们可以指定要满足特定ResultType的trait。
fn g3<T,U>(left:T,right:U)->f64
	where
		T:Mul<U,ResultType=f64>{
	return left.mul(right);
}

pub fn go(){
	let circle = Circle{radius:2.1};
	g1(circle);

	let consoleInt = ConsoleInt{};
	g2(&consoleInt,&123);

	println!("{}",g3(13,2));
	println!("{}",g3(12.0,2.0));
}