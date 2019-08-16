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
	let a:Rc<File>;
	let b:Rc<File>;

	{	
		//用带有所有权的变量来初始化Rc指针，那么该Rc指针就拥有了该变量的所有权
		let c = Rc::new(File{filename:"fish.txt"});

		//其他变量通过clone来复制一份所有权，也就是可以实现多个所有权的变量。
		//要注意的是，这种同时拥有多个所有权的代价，是变量是只读的
		a = Rc::clone(&c);
		println!("strong count {}",Rc::strong_count(&a));
	}

	println!("strong count {}",Rc::strong_count(&a));

	b = Rc::clone(&a);
	println!("strong count {}",Rc::strong_count(&b));

	//当引用计数为0时，就清空所有权，触发File的drop trait。

	//注意,Rc不能解决所有的内存释放问题，环形引用下需要配合Weak<T>使用
}

use std::cell::RefCell;

fn ref_cell(){
	let a = RefCell::new(File{filename:"a.txt"});

	{
		//a是不可变变量，但是我们依然可以修改它指向的内容
		//这是因为用RefCell包装的变量，对外都是immutable的，但是内部都是mutable的，
		//但是，它们依然需要满足rust的引用原则。
		{
			let mut mut_a = a.borrow_mut();
			mut_a.filename = "g.txt";
		}
		println!("a {:?}",a.borrow());
	}

	{
		//错误,RefCell不是指针类型，它没有deref操作，要想获取数据，就必须借用borrow或borrow_mut
		//println!("a {:?}",&a)

		let mut mut_a = a.borrow_mut();
		//错误，refcell会在运行时检查到有多个mut引用，其会panic
		//let mut mut_b = a.borrow_mut();

		//错误，refcell检查到在已经有一个mut引用的情况，不能再执行
		//let c = a.borrow();
	}

	//RefCell的一个用处时，建立RefCell成员，在不可变的Mk引用中，依然能修改这个成员
	/*
	struct Mk{
		data:RefCell<File>,
	}

	impl Mk{
		fn doing(&self){
			self.data.borrow_mut().filename = "g.txt";
		}
	}
	*/
}

fn ref_cell_and_rc(){
	let a = Rc::new(RefCell::new(File{filename:"a.txt"}));
	let b = Rc::clone(&a);

	//由于Rc的多所有权设定，它的默认规则就是只支持不可变引用
	//但是，如果我们Rc下面包一个RefCell，就能既支持多所有权，又能支持mut引用的情况
	//代价是，所有权原则变成了动态时检查了
	{
		a.borrow_mut().filename = "g.txt";
		println!("b is {:?}",b.borrow());
	}
}

fn main(){
	box1();
	box2();
	deref_auto();
	drop1();
	rc1();
	rc2();
	ref_cell();
	ref_cell_and_rc();
}
