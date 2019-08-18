extern crate outer;

use outer::user::User;

//导入Fly的trait，同时，将实现了Fly Trait的类型上添加方法
use outer::fly::Fly;

/*
use outer::fly::Swim;
错误，违反孤儿原则，不能为外部的类型User，实现外部的Trait，Swim
外部是指，不在同一个crate下的定义
impl Swim for User{
	fn swim(&self){
		println!("user swim!");
	}
}
*/

pub fn main(){
	let user = User{user_id:123,name:"cc".to_string()};
	user.walk();

	//这是一个特别的地方，通过额外添加trait，并为类型的trait提供方法，这个类型就可以在自己模块以外添加方法
	user.fly();
}