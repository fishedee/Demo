fn closure1() {
	let add = |a,b|{a+b};

	let left = 13;
	let right = 14;
	let result =  add(left,right);
	println!("{}",result);

	//失败，必包不是范型，编译器能推断类型，但只实例化一次
	//println!("{}",add(1.2,2.3))
}
//默认闭包捕捉环境变量的方式是不可变引用捕捉，然后是可变引用捕捉，最后是如果有显式的函数占用所有权的情况下就会进行所有权捕捉，也可以强制指定move来进行所有权捕捉。
//但是对于所有权捕捉时，实现copy trait的变量修改的是副本，没有实现copy trait的变量修改的是真自己。
//一般情况下，认为只有不可变引用才能进行闭包穿越（外部和内部都能使用），否则就是都不能使用的。

fn closure2(){
	//不可变引用捕捉，copy trait的外部变量
	let mut x = 4;
	{
		let equal_to_x = |z|{z == x};

		let y = 4;

		println!("x == y ?{}",equal_to_x(y));
	}
	x += 6;
	println!("x = {}",x);
}


fn closure3(){
	//可变引用捕捉，copy trait的外部变量
	let mut result = 10;
	let mut add = |x|{
		result += x;
		println!("move in result = {}",result);
	};
	add(31);
	//打印41
	println!("result = {}",result)
}

fn closure4(){
	//move捕捉，copy trait的外部变量
	let mut result = 10;
	let mut add = move|x|{
		result += x;
		println!("move in result = {}",result);
	};
	add(31);
	//打印10
	println!("result = {}",result)
}

fn closure5(){
	//不可变引用捕捉，nocopy trait的外部变量
	let mut result = String::from("mk ");
	{
		let equal_to_x = |z|{result == z};

		let y = String::from("mc ");
		println!("x == y ?{}",equal_to_x(y));
	}
	
	result = result + "77";
	println!("result = {}",result);
}

fn run(_a:&Fn(String)->bool){
	let y = String::from("mc ");
	_a(y);
}

//FIXME，closure5对于多线程可能是个问题。线程下不可变引用，但外部修改了这个线程。
fn closure55(){
	//不可变引用捕捉，nocopy trait的外部变量
	let mut result = String::from("mk ");
	{
		let equal_to_x = |z|{result == z};
		
		run(&equal_to_x);
	}
	
	result = result + "77";
	println!("result = {}",result);
}


fn closure6(){
	//可变引用捕捉，nocopy trait的外部变量
	let mut result = String::from("mk ");
	{
		let add = |x|{
			result = result + x;
			println!("move in result = {}",result);
		};
		add("hello");
	}
	//错误，因为result已经被可变引用捕捉了，不能在不可变引用了。
	//println!("result = {}",result)
}

fn closure7(){
	//move捕捉，nocopy trait的外部变量
	let mut result = String::from("mk ");
	{
		let add = move |x|{
			result = result + x;
			println!("move in result = {}",result);
		};
		add("hello");
	}
	//错误，因为result已经被move了，不能在不可变引用了。
	//println!("result = {}",result)
}

fn main(){
	closure1();
	closure2();
	closure3();
	closure4();
	closure5();
	closure6();
	closure7();

	closure55();
}
