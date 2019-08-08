struct Point{
	x:i32,
	y:i32,
}

struct Point3D{
	x:i32,
	y:i32,
	z:i32,
}

fn match1(){
	//match 语句使用模式匹配，支持可反驳，和不可反驳的匹配
	let a = 33;
	match a{
		1=>println!("1"),
		3=>println!("3"),
		_=>println!("other!"),
	}

	//if let语句使用模式匹配，只能是可反驳的匹配
	let mut b = Some(789);
	if let Some(z) = b{
		println!("b is some({})",z)
	}

	//while let语句使用模式匹配，只能是可反驳的匹配
	while let None = b{
		b = Some(34);
	}

	//for语句使用模式匹配，只能是不可反驳的匹配
	let v = vec!["g1", "g2","g3"];

	for (index, value) in v.iter().enumerate() {
	    println!("{} is at index {}", value, index);
	}

	//let语句使用模式匹配，只能是不可反驳的匹配
	let (_,y,z) = (1,2,3);
	println!("(_,{},{})",y,z);
}

fn match2(){

	//匹配字面值
	let x = 1;

	match x {
	    1 => println!("one"),
	    2 => println!("two"),
	    3 => println!("three"),
	    _ => println!("anything"),
	}

	//匹配命名变量
	let x = Some(5);
	let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),//注意，这一行不是匹配和y相同的，y只是一个参数而异
        _ => println!("Default case, x = {:?}", x),
    }

    //匹配中途加入或连接
    let x = 1;

	match x {
	    1 | 2 => println!("one or two"),
	    3 => println!("three"),
	    _ => println!("anything"),
	}

	//匹配中途加入范围
	let x = 5;

	match x {
	    1 ... 5 => println!("one through five"),
	    _ => println!("something else"),
	}

	//匹配守卫
	let num = Some(4);

	match num {
	    Some(x) if x < 5 => println!("less than five: {}", x),
	    Some(x) => println!("{}", x),
	    None => (),
	}
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn match3(){

	//解构结构体
	let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;
    println!("Point x:{},y:{}",a,b);

    //解构枚举
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.")
        },
        Message::Move { x, y } => {
            println!(
                "Move in the x direction {} and in the y direction {}",
                x,
                y
            );
        }
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => {
            println!(
                "Change the color to red {}, green {}, and blue {}",
                r,
                g,
                b
            )
        }
    }

    //解构引用
    let points = vec![
	    Point { x: 0, y: 0 },
	    Point { x: 1, y: 5 },
	    Point { x: 10, y: -3 },
	];

	let sum_of_squares: i32 = points
	    .iter()
	    .map(|&Point { x, y }| x * x + y * y)//在函数参数上解构
	    .sum();

	//使用_忽略单个字段
	let numbers = (2, 4, 8, 16, 32);
	let (first,_,third,_,fifth) = numbers;
	println!("first {},third {},fifth {}",first,third,fifth);

	//使用..忽略多个字段
	let Point3D{x,..} = Point3D { x: 33, y: 44, z: 55 };
	println!("Point x:{}",x)
}

fn main(){
	match1();
	match2();
	match3();
}
