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
	println!("x = {},y = {}",x,y);

	y.push_str(" And Dog");
	println!("y = {}",y);

	let z = y.clone();
	println!("z = {}",z);

	show2(x);
	show2(&y[0..3]);
	show2(&z[3..]);
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

	//添加
	x3.push(13);

	println!("x3 {:?}",x3);

	//iterator遍历
	for x in &x3{
		println!("x3 {}",x)
	}

	//index遍历
	for x in 0..x3.len(){
		println!("x3 {}",x3[x])
	}
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
}
