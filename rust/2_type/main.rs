use std::collections::HashMap;

fn basic(){
	//布尔
	let a = true;
	let b:bool = !a;
	println!("a = {},b = {}",a,b);

	//整数
	let c = 32;
	let d:i32 = 34;
	let e = c +d;
	println!("c={},d={},c+d={}",c,d,e);

	//浮点数
	let f:f32 = 123.45;
	println!("f = {}",f);

	//字符
	let g = 'k';
	println!("g = {}",g);
}

fn show2(data :&str){
	//&str就是不可变的字符串切片，它相当于String的不可变引用
	println!("string is {}",data)
}
fn string(){
	let x:&str = "Hello Fish";
	let mut y:String = String::from("Hello Cat");
	let mut z :  String = x.to_string();
	println!("x = {},y = {},z = {}",x,y,z);

	//拼接
	y.push_str(" And Dog");
	z = z + "_" + &y; 
	println!("y = {},z={}",y,z);

	//复制
	let m = y.clone();
	println!("m = {}",m);

	show2(x);
	show2(&y[0..3]);
	show2(&m[3..]);

	//格式化
	let n = format!("y=[{}],z=[{}]",y,z);
	println!("{}",n);

	//遍历
	let l = String::from("a你好c");
	for c in l.chars(){
		println!("char = {}",c)
	}
	for d in l.bytes(){
		println!("byte = {}",d)
	}
}

fn show(data:&[i32]){
	println!("data = {:?}",data)
}

fn array(){
	let x = [1,2,3];
	let x2:[i32;4] = [4,5,6,7];
	println!("x len={},x2 len={}",x.len(),x2.len());

	show(&x[..]);
	show(&x2[1..]);
}

fn vec(){
	
	let mut x3:Vec<i32> = vec![8,9,10,11,12];
	//println!("x={},x2={}",x,x2)
	//println!("x3={}",x3)
	println!("x3 len={}",x3.len());

	//添加和删除
	x3.push(13);
	x3.pop();

	//下标操作
	{
		let third :& mut i32 = & mut x3[2];
		*third = 34;
	}
	{
		match x3.get(102){
			Some(data)=>println!("{}",data),
			None=>println!("none! 102 index"),
		}
	}

	println!("x3 {:?}",x3);

	//iterator遍历
	for x in &x3{
		println!("x3 {}",x)
	}

	//iterator可变遍历
	{
		for x in & mut x3{
			*x += 100;
		}
	}

	//index遍历
	for x in 0..x3.len(){
		println!("x3 {}",x3[x])
	}
}

fn map(){
	let mut scores = HashMap::new();

	//添加
	scores.insert(String::from("Blue"),10);
	scores.insert(String::from("Green"),50);

	println!("scores {:?}",scores);

	//查找
	let score1 = scores.get(&String::from("Yellow"));
	let score2 = scores.get(&String::from("Blue"));

	if let Some(v) = score1{
		println!("score1 value {}",v);
	}else{
		println!("score1 empty!");
	}

	if let Some(v) = score2{
		println!("score2 value {}",v);
	}else{
		println!("score2 empty!");
	}

	//不存在就添加，总是返回引用
	word_count();
}

fn word_count(){
	let text = "hello world wonderful world , hello fish , you will enjoy";

	let mut map = HashMap::new();

	for word in text.split_whitespace(){
		let count = map.entry(word).or_insert(0);
		*count += 1;
	}
	println!("{:?}",map)
}

fn tunple(){
	let x = (1,'c');
	let y:(i32,char) = (2,'d');
	println!("x.0={},y.1={}",x.0,y.1);
}

fn main(){
	basic();
	string();
	array();
	vec();
	tunple();
	map();
}
