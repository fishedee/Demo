use std::ptr::NonNull;

struct A<'a>{
	a:String,
	b:Option<&'a String>,
}

//我们企图建立一个自引用的A结构体，它的b字段就是指向a字段的，但是A结构体上的生命周期'a无法很好地确定下来是什么
/*
impl<'a> A<'a>{
	fn new(data:String)->A{
		let result = A{
			a:data,
			b:Option::None(),
		};

		result.b = Some(result.b);
		return result;
	}
}
*/

fn go1(){
	//let a = A::new("abc".to_string());
}

//使用NonNull就能获得一个自引用的结构体，NonNull代表一个引用字段，但是没有生命周期的，这意味着编译器无法帮你检查引用的有效性
//这是一个危险的工具
#[derive(Debug)]
struct B{
	a:String,
	b:NonNull<String>,
}

impl B{
	fn new(data:String)->B{
		return B{
			a:data,
			b:NonNull::dangling(),
		};
	}
	fn init(&mut self){
		self.b = NonNull::from(&self.a);
	}
}

fn go2(){
	let mut data = B::new("abc".to_string());
	data.init();

	//打印出来的data.a地址，和data.b的数值是一样的
	println!("{},{:p},{:?}",data.a,&data.a,data.b);
}

fn main(){
	go1();
	go2();
}