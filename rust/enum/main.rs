enum Sex {
	Male,
	Female,
	Unknown
}

fn check_sex(sex:Sex){
	let data = match sex{
		Sex::Male=>"man",
		Sex::Female=>"woman",
		_=>"Oh my god!",
	};
	println!("sex is {}",data);
	if let Sex::Female = sex{
		println!("my love!");
	}
}

enum Color{
	Rgb(u32,u32,u32),
	None
}

fn check_color(color:Color){
	match color{
		Color::Rgb(a,b,c)=>{
			println!("rgb ({},{},{})",a,b,c);
		},
		_=>{
			println!("none")
		}
	};
	if let Color::Rgb(a,b,c) = color{
		println!("rgb sum = {}",a+b+c);
	}
}

fn main(){
	let sex1 = Sex::Male;
	let sex2 = Sex::Female;
	let sex3 = Sex::Unknown;
	check_sex(sex1);
	check_sex(sex2);
	check_sex(sex3);
	let color1 = Color::Rgb(1,2,3);
	let color2 = Color::None;
	check_color(color1);
	check_color(color2);
}
