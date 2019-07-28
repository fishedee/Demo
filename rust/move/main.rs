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


fn main(){
	move1();
	move2();
	move3();
}
