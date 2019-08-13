#[derive(Debug)]
struct Class{
	class_id:i32,
	name:String,
}

#[derive(Debug)]
struct User<'a>{
	user_id:i32,
	age:i32,
	class1:&'a Class,
	class2:&'a Class,
}

impl<'a> User<'a>{
	fn set_class1(&mut self,class:&'a Class){
		self.class1 = class;
	}
}

fn main(){//作用域'a
    
    let class_one = Class{class_id:789,name:"md".to_string()};
    let class_ref:&Class;
    {
    	let class_two = Class{class_id:123,name:"me".to_string()};
    	let mut user = User{user_id:234,age:789,class1:&class_two,class2:&class_two};

    	println!("{:?}",user);

    	user.class1 = &class_one;
    	user.class2 = &class_one;

    	println!("{:?}",user);

    	class_ref = user.class1;
    }

    println!("{:?}",class_ref);
}