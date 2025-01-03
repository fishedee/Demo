fn ref1_test( a : &String){
	println!("a = {}",a)
}

fn ref1(){
	let a = String::from("Hello move3");

	//将a以引用方式传递，而不是以move方式传递，引用不改变所有权，但是默认的是不可变引用
	ref1_test(&a);

	//成功，a依然拥有所有权
	println!("a = {}",a);

	{	
		let _mu = String::from("Hello mg");
		let c:&String = & a;
		//失败，c是非mut引用的，所以c也不能执行*c操作来改变a
		//*c = String::from("Hello move4");

		//失败，c是非mut的，它不能改变它自身
		//c = &_mu;

	}

	{
		let _mu = String::from("Hello move7");
		let mut c:&String = &a;

		//失败，c是非mut引用的，所以c也不能执行*c操作来改变a
		//*c = String::from("Hello move4");

		//成功，c是mut的，它能改变它自身
		c = &_mu;
	}

	{
		let mut _mu = String::from("Hello move7");
		let c:& mut String = &mut _mu;

		//成功，c是mut引用，所以它能执行*c操作来改变_mu
		*c = String::from("Hello cs");
	}
	
	print!("a = {}",a);
}

fn ref2_test(a :& mut Vec<i32>){
	//可变引用，所以可以修改
	a.push(5);
}

fn ref2(){
	//对象的可变引用
	let mut a = vec![1,2,3,4];

	//将a以引用方式传递，而且是以可变方式引用
	ref2_test(& mut a);

	//成功，a依然拥有所有权
	for i in 0..a.len(){
		println!("a[{}] = {}",i,a[i]);
	}

	//自身的可变引用改变
	let mut b = 34;
	{
		let c = &mut b;
		*c = 35;
	}
	let g = b;
	println!("b = {}",b);
}

//规则1，任何借用的有效期都不能超过原始所有者的作用域。
fn ref3(){
    let x = 4;
    let mut x_ref: &i32 = &x;
 
    // 成功，x_ref的作用域与所有者的作用域一样大
    println!("x_ref: {}", x_ref);
 	
	//失败，x_ref引用的作用域比所有者的作用域更少
	/*
    {
        let y = 5;
        x_ref = &y;
    }
	// println!("x_ref: {}", x_ref);
	*/
}

//规则2，在任何给定时刻，您都能不可变地借用（或引用）一个资源许多次。但你不能既不可变借用，又可变借用
fn ref4(){
	let mut x = 4;
    let x_ref_1 = &x;
    //失败，在已经有不可变借用的基础上，不能再添加可变借用
   	//let x_mut_ref = &mut x;
    println!("x_ref = {}",x_ref_1);
}

//规则3，在任何给定时刻，您都能可变地借用（或引用）一个资源一次。
//结合规则2和规则3，这意味着，一旦某个变量被不可变借用了，那么这个变量就真的无法被修改了，（不可能被所有权修改，也不可能被可变借用修改，这大大提高了可靠性，也促进编译器做可靠的优化）
fn ref5(){
	let mut x = 4;
    let x_ref_1 = &mut x;
    //失败，在已经有可变借用的基础上，不能再添加可变借用
    //let x_ref_2 = &mut x;
    println!("x_ref = {}",x_ref_1);
}

fn ref6(){
	let mut a1:String = "adf".to_string();
	let mut a2:String = "cde".to_string();

	{
		//创建一级指针，指针指向的内容是可变的，而指针自身也是可变的
		let mut b:& mut String = & mut a1;
		{
			//创建二级指针，指针指向的内容是可变的，而指针自身是不可变的。注意，二级指针的指向内容是一级指针。
			let c:&mut &mut String = &mut b;

			*c = &mut a2;
			(*c).push_str("_mj");
		}
		b.push_str("_fu");
	}

	println!("a1:{},a2:{}",a1,a2)
}

fn main(){
	ref1();
	ref2();
	ref3();
	ref4();
	ref5();
	ref6();
}
