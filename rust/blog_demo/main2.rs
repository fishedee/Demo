#[derive(Debug)]
struct Class{
	class_id:i32,
	name:String,
}

#[derive(Debug)]
struct User<'a,'b>{
	user_id:i32,
	age:i32,
	class1:&'a Class,
	class2:&'b Class,
}

fn main(){//作用域'a
   
    let class_one = Class{class_id:123,name:"mc".to_string()};
    let class_ref:&Class;
    {	
    	let class_two = Class{class_id:789,name:"md".to_string()};
    	let user = User{user_id:234,age:789,class1:&class_one,class2:&class_two};

    	class_ref = user.class1;
    	println!("{:?}",class_ref);
    }

    println!("{:?}",class_ref);
}