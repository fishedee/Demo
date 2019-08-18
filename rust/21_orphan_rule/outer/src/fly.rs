use super::user::User;

pub trait Fly{
	fn fly(&self);
}

impl Fly for User{
	fn fly(&self){
		println!("user fly!");
	}
}

pub trait Swim{
	fn swim(&self);
}