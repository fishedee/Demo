#[derive(Debug)]
struct User{
	user_id:i32,
	name:String,
	age:i32,
}

fn print_age(user:&User){
	println!("age:{}",user.age)
}

fn set_age(user:&mut User){
	user.age += 1;
}

fn move_data(user:User){
	println!("{:?}",user)
}

use std::ops::Deref;
use std::ops::DerefMut;

//Box的用法，让对象分配在堆上，转移所有权时速度更快，对于大对象的优化比较明显。
//Box包装以后，获取成员，方法，引用等方法和原来一样。
fn box1(){
	//普通的User，分配在栈上
	let mut user1 = User{
		user_id:10001,
		name:String::from("cat"),
		age:12,
	};
	//普通的获取不可变引用
	print_age(&user1);

	//Box包装的User，分配在堆上
	let mut user2 = Box::new(User{
		user_id:10001,
		name:String::from("fish"),
		age:11,
	});
	//Box的获取不可变引用，写法一样
	print_age(&user2);
	print_age(user2.deref());

	{
		//Box的获取可变引用，写法一样
		set_age(&mut user1);
		set_age(&mut user2);
		set_age(user2.deref_mut());
	}

	//获取成员，写法完全一样
	println!("user1 {:?},name:{}",user1,user1.name);
	println!("user2 {:?},name:{}",user2,user2.name);

	//唯一不同的是，移动所有权本身，user1就是直接移动，Box包装的要用*用法
	move_data(user1);
	//只有Box类型的*引用，是可以被move的，其他的指针类型的*操作都不能被move。这是编译器的一个trick，不能被改变
	//详情看https://manishearth.github.io/blog/2017/01/10/rust-tidbits-box-is-special/
	move_data(*user2);

	//错误，移动以后，无论是普通用法，还是Box用法，都是无法使用的
	//println!("{:?},{:?}",user1,user2)
}

//Box的另外一种用法，作为递归类型的包装。如果不用Box，递归类型的大小将是无限大。
#[derive(Debug)]
enum List{
	Cons(i32,Box<List>),
	Nil,
}

fn box2(){
	let leaf = Box::new(List::Nil);
	let child1 = Box::new(List::Cons(3,leaf));
	let child2 = Box::new(List::Cons(4,child1));
	let list = List::Cons(1,child2);

	println!("{:?}",list)
}

#[derive(Debug)]
struct File<'a>{
	filename:&'a str,
}

impl<'a> Drop for File<'a>{
	fn drop(&mut self){
		println!("close file {}",self.filename)
	}
}

use std::mem;

fn drop1(){
	let _a = File{filename:"/a.txt"};

	let b = File{filename:"/b.txt"};

	let _c = File{filename:"/c.txt"};

	{	
		let _d = File{filename:"/d.txt"};
		//离开这里就触发d的drop
	}

	//手动触发b的drop，而后b不会再触发drop
	mem::drop(b);

	//根据堆栈顺序，先触发c，然后a
}

fn deref_auto(){
	let a = Box::new(String::from("mk"));

	//正常情况下，a可以执行&str的方法，但是Box类型并没有bytes方法呀
	println!("bytes {:?}",a.bytes());

	//因为编译器会从自身开始寻找方法，找不到就不断递归执行deref()
	//第一个deref()返回的是&String，第二个deref()返回的是&str，
	println!("bytes {:?}",a.deref().deref().bytes());
}

use std::rc::Rc;

fn rc1(){
	//普通的User，分配在栈上
	let mut user1 = User{
		user_id:10001,
		name:String::from("cat"),
		age:12,
	};
	//普通的获取不可变引用
	print_age(&user1);

	//Rc包装的User，分配在堆上
	let mut user2 = Rc::new(User{
		user_id:10001,
		name:String::from("fish"),
		age:11,
	});

	//Rc的获取不可变引用，写法一样
	print_age(&user2);
	print_age(user2.deref());

	{
		set_age(&mut user1);
		//错误，Rc是不能获取可变引用的，这个和Box是不一样的。
		//从语法来看，Rc没有实现deref_mut，所以不能获取可变引用
		//从语义来看，Rc的所有权由多个所有者所共享，所以不应该获取可变引用，一旦多个所有者都获取可变引用时，就会出现数据竞态的问题。
		//set_age(&mut user2);
		//set_age(user2.deref_mut());
	}

	//获取成员，写法完全一样
	println!("user1 {:?},name:{}",user1,user1.name);
	println!("user2 {:?},name:{}",user2,user2.name);

	//唯一不同的是，移动所有权本身，user1就是直接移动，Box包装的要用*用法
	move_data(user1);
	//错误，Rc的*操作是不能move的，这属于正常情况，只有Box是被编译器特别照顾的，能被DerefMove的
	//move_data(*user2);
}

fn rc2(){

}

fn main(){
	box1();
	box2();
	deref_auto();
	drop1();
	rc1();
	rc2();
}
