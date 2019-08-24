macro_rules! find_min{
	($x:expr)=>($x);
	($x:expr,$($y:expr),+)=>{
		std::cmp::min($x,find_min!($($y),+))
	}
}

//使用递归定义vector，另外要注意的是，rust的宏是卫生的，编译器保证宏里面定义的变量或函数不会与外面的冲突。
macro_rules! vector_inner {
	($func_name:ident,$y:expr)=>{
		$func_name.push($y);
	};
	($func_name:ident,$y:expr,$($z:expr),*) => {
		$func_name.push($y);
		vector_inner!($func_name,$($z),*);
	}
}

macro_rules! vector{
	($x:expr,$($y:expr),*)=>{
		{
			let mut temp_vec = Vec::new();
			temp_vec.push($x);
			vector_inner!(temp_vec,$($y),*);
			temp_vec
		}
	};
}


pub fn go(){
	println!("{}",find_min!(23));
	println!("{}",find_min!(23,2));
	println!("{}",find_min!(23,2,43));

	let data = vector![1,2,3,4,5];
	println!("{:?}",data);
}