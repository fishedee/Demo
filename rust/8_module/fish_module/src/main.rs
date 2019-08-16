mod sound {
    pub mod instrument {
        pub fn clarinet() {
            println!("clarinet")
        }
    }
}

mod instrument {
    pub fn clarinet() {
    	//引用父级的模块
        super::breathe_in();
    }
}

fn breathe_in(){
	println!("breathe_in")
}

mod fish {
	pub mod jj{
		pub fn pi() -> f64{
			return 3.1415926
		}
	}
}

mod cat{
	pub mod kk{
		pub fn e() -> f64{
			return 2.71828182845
		}
	}
}
	
//使用绝对路径的use来引入模块
use crate::fish::jj;

//使用相对路径的use来引入模块
use self::cat::kk;

use rand::Rng;

//引入本目录的其他文件的模块
mod video;

//引入子目录的其他文件的模块
mod music;

use self::video::picture;

use self::music::mj;

fn main() {
    //绝对路径引用模块
    crate::sound::instrument::clarinet();

    //相对路径引用模块
    sound::instrument::clarinet();

    instrument::clarinet();

    println!("pi is {},e is {}",jj::pi(),kk::e());

    let secret_number = rand::thread_rng().gen_range(1, 101);

    println!("number = {}",secret_number);

   	picture::clarinet();

   	mj::clarinet();
}