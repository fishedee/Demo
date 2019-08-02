use std::fs::File;
use std::io;
use std::io::ErrorKind;
use std::io::Read;

fn match_check(){
	let f = File::open("hello.txt");
	match f {
		Ok(_file)=>println!("found file!"),
		Err(error)=>match error.kind(){
			ErrorKind::NotFound=>println!("file not found"),
			_=>println!("other_error {:?}",error),
		}
	};
}

fn map_error_check(){
	let f = File::open("hello.txt").map_err(|error|{
		//仅在有error时才走这里的分支，将error转换后生成新的Result
		//没有error时，返回原来的Result
		if error.kind() == ErrorKind::NotFound{
			println!("file not found");
		}else{
			println!("other_error {:?}",error);
		}
	});
	println!("{:?}",f)
}

fn check_and_panic(){
	//遇到error直接panic
	let _f = File::open("main.rs").unwrap();

	//遇到error也是panic，但是带上自己的私货
	let _f2 = File::open("main2.rs").expect("do not exist main2.rs");
}

fn check_and_spread() -> Result<String,io::Error>{
	//?操作符当遇到错误时，直接return
	let mut data = String::new();

	let mut f = File::open("main.rs")?;

	f.read_to_string(&mut data)?;

	return Ok(data);
}

fn main(){
	match_check();
	map_error_check();
	check_and_panic();
	let _ = check_and_spread();
}