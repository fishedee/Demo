#[derive(Debug)]
struct User{
	user_id:i32,
	name:String,
	age:i32,
}

fn print_age(user:&User){
	println!("age:{}",user.age)
}

//Box的用法，让对象分配在堆上，转移所有权时速度更快，对于大对象的优化比较明显。
//Box包装以后，获取成员，方法，引用等方法和原来一样。
fn box1(){
	//普通的User，分配在栈上
	let user1 = User{
		user_id:10001,
		name:String::from("cat"),
		age:12,
	};
	//普通的获取不可变引用
	print_age(&user1);

	//Box包装的User，分配在堆上
	let user2 = Box::new(User{
		user_id:10001,
		name:String::from("fish"),
		age:11,
	});
	//Box的获取不可变引用，写法一样
	print_age(&user2);


	//获取成员，写法完全一样
	println!("user1 {:?},name:{}",user1,user1.name);
	println!("user2 {:?},name:{}",user2,user2.name);
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

fn main(){
	box1();
	box2();
}
