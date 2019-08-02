use std::error::Error;
use std::fs::File;
use std::io::Read;
use std::env;
use std::convert::From;

struct Config{
	file: String,
	query:String,
	is_case_sensitive:bool,
}

fn read_config()->Result<Config,Box<dyn Error>>{
	let args:Vec<String> = env::args().collect();

	if args.len() < 3{
		return Err(From::from("at least two argument"))
	}

	let query = args[1].clone();
	let file = args[2].clone();
	let case_sensitive = env::var("CASE_INSENSITIVE").is_err();

	return Ok(Config{
		file:file,
		query:query,
		is_case_sensitive:case_sensitive,
	});
}

fn read_file(filename:&String)->Result<String,Box<dyn Error>>{
	let mut f = File::open(filename)?;

	let mut data:String = String::new();

	f.read_to_string(& mut data)?;

	return Ok(data);
}

fn find<'a>(content:&'a String,query: &String,is_case_sensitive:bool)->Result<Vec<&'a str>,Box<dyn Error>>{
	//在尽可能减少copy的情况下，需要这样写，先建立temp的String，然后将query_ptr指向它。
	//FIXME，好看的办法是直接将query.clone()，但是有多余的copy。

	let lines = content.lines();
	let mut result = Vec::new();
	let query_ptr:&String;
	let temp: String;

	if is_case_sensitive == true{
		query_ptr = query
	}else{
		temp = query.to_lowercase();
		query_ptr = &temp;
	}

	for line in lines {
		let line_ptr:&str;
		let temp2:String;
		if is_case_sensitive == false{
			temp2 = line.to_lowercase();
			line_ptr = &temp2;
		}else{
			line_ptr = &line;
		}

		if line_ptr.contains(query_ptr){
			result.push(line);
		}
	}

	return Ok(result);
}

pub fn run() ->Result<(),Box<dyn Error> >{
	let config = read_config()?;

	let content = read_file(&config.file)?;

	let result = find(&content,&config.query,config.is_case_sensitive)?;

	for line in result{
		println!("{}",line)
	}

	Ok(())
}