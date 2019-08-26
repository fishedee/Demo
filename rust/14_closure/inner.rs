//在rust中，FnOnce的trait的范围最大，继而是FnMut和Fn
//能实现Fn，肯定都能实现FnOnce和FnMut，反过来就不行
//能实现FnMut，肯定能实现FnOnce，反过来就不行

fn must_get_ownership(mut a:String){
	a.push_str("_gg");
	println!("I get the owner {}",a);
}

fn go_fn_once<T>(a:T)
	where T:FnOnce(){
	a();
}

fn go_fn_mut<T>(a:& mut T)
	where T:FnMut(){
	a();
}

fn go_fn<T>(a:&T)
	where T:Fn(){
	a();
}

fn run1(){
	let data:String = "123".to_string();
	let fn_once_closure = ||{
		must_get_ownership(data);
	};

	//错误，fn_once无法赋值给Fn
	//go_fn(&fn_once_closure);

	//错误，fn_once无法赋值给FnMut
	//go_fn_mut(& mut fn_once_closure);

	//正确，fn_once可以赋值给FnOnce
	go_fn_once(fn_once_closure);

	let mut data2:String = "456".to_string();
	let mut fn_mut_closure = ||{
		data2.push_str("adsfasdf");
		println!("data2 {}",data2);
	};

	//错误，fn_mut无法赋值给Fn
	//go_fn(&fn_once_closure);

	//正确，fn_mut可以赋值给FnMut
	go_fn_mut(& mut fn_mut_closure);

	//正确，fn_mut可以赋值给FnOnce
	go_fn_once(fn_mut_closure);

	let data3:String = "789".to_string();
	let mut fn_closure = ||{
		println!("data3 {}",data3);
	};
	println!("data3 outer is {}",data3);

	//正确，fn可以赋值给Fn
	go_fn(&fn_closure);

	//正确，fn可以赋值给FnMut
	go_fn_mut(& mut fn_closure);

	//正确，fn可以赋值给FnOnce
	go_fn_once(fn_closure);

	let data4:String = "0ab".to_string();
	//move的关键字并没有改变函数的中如何使用这个外部变量，它改变的是闭包如何保存这个外部变量。
	//也就是没有改变函数的trait，但会改变外部变量的捕获方式，即使是以不可变引用来使用这个变量，也以所有权转移的方式获取这个变量。
	let mut fn_closure = move||{
		println!("data4 {}",data4);
	};
	//错误，data4的所有权已经被转移了
	//println!("data4 outer is {}",data4);

	//正确，fn可以赋值给Fn
	go_fn(&fn_closure);

	//正确，fn可以赋值给FnMut
	go_fn_mut(& mut fn_closure);

	//正确，fn可以赋值给FnOnce
	go_fn_once(fn_closure);
}

#[derive(Debug)]
struct FnOnceState{
	data:String,
}

impl FnOnceState{
	fn call_once(self){
		must_get_ownership(self.data);
	}
}

struct FnMutState<'a>{
	data:&'a mut String
}

impl<'a> FnMutState<'a>{
	fn call_mut(&mut self){
		self.data.push_str("adsfasdf");
		println!("data2 {}",self.data);
	}
}

struct FnState<'a>{
	data:&'a String
}

impl<'a> FnState<'a>{
	fn call(& self){
		println!("data3 {}",self.data);
	}
}

struct FnMoveState{
	data:String
}

impl FnMoveState{
	fn call(&self){
		println!("data4 {}",self.data);
	}
}

fn run2(){
	//FnOnce的实现
	let data:String = "123".to_string();
	let fn_once_state = FnOnceState{
		data:data,
	};
	fn_once_state.call_once();

	//FnMut的实现
	let mut data2:String = "456".to_string();
	let mut fn_mut_state = FnMutState{
		data:& mut data2,
	};
	fn_mut_state.call_mut();

	//Fn的实现
	let data3:String = "789".to_string();
	let fn_state = FnState{
		data:& data3,
	};
	println!("data3 outer is {}",data3);
	fn_state.call();

	//Fn+Move的实现
	let data4:String = "0ab".to_string();
	let fn_move_state = FnMoveState{
		data:data4,
	};
	//错误，data4已经被转移了
	//println!("data4 outer is {}",data4);
	fn_move_state.call();


	//从以上的实现可以看出，closure其实就是个struct，struct的字段就是要捕获的外部变量。
	//捕获的方式要么是所有权捕获FnOnce，要么是可变捕获FnMut，要么是不可变捕获Fn
	//rust隐式的捕获方式是尽可能往Fn,FnMut，最后才到FnOnce的顺序。
	//另外，我们可以显示地指定move，来改变捕获的方式
}

fn run3(){
	//既然闭包是一个struct，是一个普通的类型，那么就可以实现clone，copy，send，sync等的trait。
	//实现的方式是通过编译器自动指定的，当捕获的外部变量都是clone类型时，就会自动实现clone类型。
	let data:String = "123".to_string();
	let data2:FnOnceState = FnOnceState{
		data:"asdf".to_string()
	};
	let closure1 = move ||{
		println!("data {} {:p}",data,&data);

		//错误，一旦使用了下面这句，外部变量就包含了FnOnceState类型，可是FnOnceState类型并没有实现Clone的trait
		//就会造成整个闭包无法clone
		//println!("data2 {:?}",data2);
	};
	let closure2 = closure1.clone();
	closure1();
	closure2();
}

pub fn go(){
	run1();
	run2();
	run3();
}