mod miniregexp;

use std::process;

fn main(){
	if let Err(e) = miniregexp::run(){
		eprintln!("miniregexp fail:{}",e);
		process::exit(1);
	}
}
