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

fn main(){//作用域'a
    
    let class_one = Class{class_id:789,name:"md".to_string()};
    let mut user = User{user_id:234,age:789,class1:&class_one,class2:&class_one};
    {	
    	let class_two = Class{class_id:789,name:"md".to_string()};
    	user.class1 = &class_two;

        println!("{:?}",user);

        user.class1 = &class_one;
    }

    println!("{:?}",user);
}