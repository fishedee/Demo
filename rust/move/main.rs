fn move1(){
	let a = String::from("Hello move1");
	//默认的=号是move语义，除非实现了copy trait，而String默认没有copy trait，故只有move
	let b = a;
	println!("b = {}",b);
	//失败，a是空的
	//println!("a = {}",a);
}

fn move2_test( a : String){
	println!("a = {}",a)
}

fn move2(){
	let a = String::from("Hello move2");
	//这一句已经将a移动到函数move2_est里面了
	move2_test(a);

	//失败，a是空的
	//println!("a = {}",a)
}

fn move3_test( a : String)->String{
	println!("a = {}",a);
	return a
}

fn move3(){
	let a = String::from("Hello move3");

	//这一句已经将a移动到函数move3_test里面了，但是再次move回来了
	let a = move3_test(a);

	//成功，这时候的a不是空的
	println!("a = {}",a)
}

#[derive(Debug)]
struct Foo{
	data:i32
}

impl Drop for Foo{
	fn drop(&mut self){
		println!("drop :{:p}",self)
	}

}

fn move4(){
	//创建一个Foo类型
	let mut f = Foo{data:123};
	println!("f address:{:p},{:?}",&f,f);

	//执行move操作，move操作就是直接对数据进行浅拷贝，并且在编译器里标注原来的变量已经失效了，原来的变量不再执行drop操作
	//注意，move操作并不是指针指向修改操作，因为进行move操作以后，数据的地址改变了
	let mut f2 = f;
	f2.data = 456;
	println!("f2 address:{:p},{:?}",&f2,f2);
	println!("end");

	//执行drop操作，这个时候的打印的drop地址与f2的地址一致
}


fn main(){
	move1();
	move2();
	move3();
	move4();
}
