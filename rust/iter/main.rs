fn iter1(){
	let mut v = vec![1,2,3];

	//普通迭代
	{
		for i in &v{
			println!("{}",i)
		}
	}

	//不可变引用迭代，每个迭代项都是指向元素的不可变引用
	{
		for x in v.iter(){
			println!("{}",*x)
		}
	}

	//可变引用迭代，每个迭代项都是指向元素的可变引用
	{
		for x in v.iter_mut(){
			println!("{}",*x)
		}
	}
	
	//move迭代，每个迭代项都是指向元素的所有权，这意味着，一旦执行后，v就被move了
	{
		for x in v.into_iter(){
			println!("{}",x)
		}
	}

	//错误，v已经被into_iter取走了，无法打印了
	//println!("{:?}",v)
}

fn iter2(){
	let v = vec![7,8,9];
	let mut iter = v.iter();

	//iter的本质就是满足带有一个next函数的trait，这个next函数返回的是Option<Some<T>>
	loop{
		let elem = iter.next();
		if let None = elem{
			break
		}else if let Some(data) = elem{
			println!("elem {}",data)
		}
	}
}

#[derive(Debug)]
struct Shoe{
	size:u32,
	style:String,
}

fn iter3(){
	//凡是符合iter trait的，都能使用iter trait的辅助函数，filter,map,collect等等。
	let shoes = vec![
		Shoe { size: 10, style: String::from("sneaker") },
        Shoe { size: 13, style: String::from("sandal") },
        Shoe { size: 10, style: String::from("boot") },
	];
	let new_shoes = shoes.into_iter()
		.filter(|s|{s.size == 10})
		.map(|s|{
			Shoe{
				style:s.style+"_mk",
				..s
			}
		})
		.collect::<Vec<_>>();
	println!("new_shoes {:?}",new_shoes)
}

//自定义一个iterator
struct Counter{
	count:u32,
	begin:u32,
}

impl Counter{
	fn new(count:u32)->Counter{
		Counter{
			begin:0,
			count:count,
		}
	}
}

impl Iterator for Counter{
	type Item = u32;

	fn next(&mut self)->Option<Self::Item>{
		self.begin += 1;
		if self.begin <= self.count{
			return Some(self.begin-1);
		}else{
			return None;
		}
	}
}

fn iter4(){
	let counter = Counter::new(10);

	let list = counter.collect::<Vec<_>>();

	println!("counter {:?}",list)
}

fn main(){
	iter1();
	iter2();
	iter3();
	iter4();
}
