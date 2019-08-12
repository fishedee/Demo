#[derive(Debug)]
struct User{
	user_id:i32,
	age:i32,
}

//获取a的作用域，作为返回值引用的作用域
fn add_user_age<'s>(a:&'s mut User,b:&User)->&'s User{
	a.age += b.age;
	return a;
}

fn main(){//作用域'a
   
    let user_ref:&User;
    let mut user1 = User{user_id:10,age:2};
    {//作用域'b

    	let user2 = User{user_id:2,age:3};

    	//user1的作用域是'a，user2的作用域是'b，根据函数签名，我们可以推导出返回值的作用域是'a
    	user_ref = add_user_age(& mut user1,&user2);

    	//正确，编译通过
   		//在解引用的作用域'b中，当所有者的作用域为'a，编译通过
    	println!("{:?}",user_ref)
    }
   		
   	//正确，编译通过
   	//在解引用的作用域'a中，当所有者的作用域为'a，编译通过
   	println!("{:?}",user_ref); 
}