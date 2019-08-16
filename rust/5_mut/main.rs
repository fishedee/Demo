fn mut1(){
	let mut a = String::from("Hello Fish");
	let b = &a;
	//失败，不能修改一个已经借出的immutable引用的数据
	//a.push_str("mm");
	//失败，既不能修改内容，也不能修改指向
	//a = String::from("kk");
	println!("Hello {}",b)
}

fn mut2(){
	let mut a = String::from("Hello kk");
	{
		let b = & mut a;
		b.push_str("cg");
		//失败，不能修改一个已经借出mutable引用的数据
		//a.push_str("ce");
		//失败，既不能修改内容，也不能修改指向
		//a = String::from("Hello gg");
	}
	println!("{}",a);
}

fn main(){
	mut1();
	mut2();
}