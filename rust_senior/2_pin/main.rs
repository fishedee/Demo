//Pin是一个特殊的指针类型，它不管理关于管理权，它是管理引用的智能指针。
#![feature(pin)]
use std::pin::Pin;
use std::ops::DerefMut;
use std::ops::Deref;
use std::marker::PhantomPinned;

//默认的变量都是Unpin的
#[derive(Debug)]
struct A{
	a:String,
	b:i32,
}

fn go1(){
	let mut data = A{
		a:"123".to_string(),
		b:456,
	};
	//对于Unpin的类型，我们可以安全地通过new来创建这个pin
	let mut pin = Pin::new(&mut data);

	//也可以对它的字段进行读写操作
	pin.a.push_str("gg");
	println!("{:?}",pin);

	pin.deref_mut().a.push_str("ck");
	println!("{:?}",pin);

	//也可以，直接获取整个变量的可变引用
	let mut pin2 = pin.get_mut();
	*pin2 = A{
		a:"456".to_string(),
		b:789,
	};
	println!("{:?}",data);
	
}

//通过添加一个Pinned成员，来让这个结构体是Pin的，而不是Unpin的。
#[derive(Debug)]
struct B{
	a:String,
	b:i32,
	_pin: PhantomPinned,
}

fn go2(){
	let mut data = B{
		a:"123".to_string(),
		b:456,
		_pin:PhantomPinned,
	};
	//无法使用new来创建pin，因为它是Pin的
	//let mut pin = Pin::new(&mut data);

	//所以只能使用unsafe的，new_unchecked来创建Pin类型，这意味着你必须自己保证data是不会move的。
	//如果想用Pin管理一个Pin对象，同时new的时候不遇到unsafe的话，可以用Box::pin或Arc::pin来创建。
	let mut pin;
	{
		pin = unsafe{
			Pin::new_unchecked(&mut data)
		};
	}

	//错误，因为data是Pin的，甚至就不会被允许获取它的可变引用
	//pin.a.push_str("gg");
	//println!("{:?}",pin);

	//错误，同理，这样写也是不对的。
	//pin.deref_mut().a.push_str("ck");
	//println!("{:?}",pin);

	//错误，同理，也不能直接获取整个变量的可变引用
	//let mut pin2 = pin.get_mut();

	//你可以做用的仅仅是获取它的不可变引，以安全的方式
	println!("{:?},{:?}",pin.a,pin.deref().b);
	
	//你可以整个设置它的数据，以安全的方式
	pin.set(B{
		a:"789".to_string(),
		b:3,
		_pin:PhantomPinned,
	});
	println!("{:?}",pin);

	//当然，你也可以强制获取它的mut引用，但是必须标志这是一种unsafe的做法
	let mut_ref:&mut B = unsafe{
		pin.get_unchecked_mut()
	};
	mut_ref.a = "abc".to_string();
	println!("{:?}",data);
}

//Pin的智能指针是一种工具
//语法上，它的功能是阻止Pinned特性的类型执行move操作
//执行move操作有两种方法：
//要么在直接在变量中赋值到另外一个变量，但是创建Pin时获取了获取了数据的引用，所以这种方式肯定编译不过
//要么就是获取变量的可变引用，然后执行mem::replace 或 mem::swap来实现。但是，Pin阻止了Pinned特性的类型获取可变引用，除非是unsafe的方式，所以也阻止了这种事情
//另外，Pin的智能指针不阻止对数据的修改操作，你可以通过set来整个赋值来实现数据修改。
//那么，在语义上来说，什么类型需要被阻止执行move操作呢？
//答案是自引用的类型，一旦move了，引用的指向就会出问题，成为悬空指针
//详情可以看[这里](https://www.colabug.com/5395983.html)
fn main(){
	go1();
	go2();
}