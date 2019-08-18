pub struct User{
	pub user_id:i32,
	pub name:String,
}

impl User{
	pub fn walk(&self){
		println!("user walk");
	}
}