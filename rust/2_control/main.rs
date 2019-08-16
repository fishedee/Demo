
fn if_control(){
	let i = 5;
	if i == 5{
		println!("data = five")
	}else if i == 6 {
		println!("data = six")
	}else{
		println!("data = other")
	}
}

fn loop_control(){
	let mut i = 0;
	loop{
		if i == 5 {
			break
		}
		println!("i = {}",i);
		i += 1;
	}
}

fn while_control(){
	let mut i = 0;
	while i != 6{
		println!("i = {}",i);
		i += 1;
	}
}

fn for_control(){
	for i in 0..7{
		println!("i = {}",i);
	}
}

fn main(){
	if_control();
	loop_control();
	while_control();
	for_control();
}
