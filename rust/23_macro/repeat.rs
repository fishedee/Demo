//带重复模式的宏定义，注意有两层$，第一层代表每个重复的模式，第二层代表一个重复中如何匹配。
macro_rules! vector{
	($($x:expr),*)=>{
		{
			let mut temp_vec = Vec::new();
			//生成的时候，也是如此
			//第一层$代表如何生成每个重复的模式
			//第二层$代表如何生成一个重复中的内容
			$(temp_vec.push($x);)*
			temp_vec
		}
	};
}

pub fn go(){
	let a = vector![1,2,3,4];
	println!("{:?}",a);
}