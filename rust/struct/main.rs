//FIXME 没有区分私有还是公有方法或成员？
//普通结构体
#[derive(Debug)]//加入debug的trait，支持print输出
struct Circle{
    center: (i32,i32),
    radius: u32,
}

impl Circle{
	fn new(center:(i32,i32),radius:u32)->Circle{
		return Circle{
			center:center,
			radius:radius,
		}
	}

	fn area(&self)->f64{
		let radius_f = self.radius as f64;
		return radius_f * radius_f * 3.1415926;
	}

	fn move_to(&mut self,center:(i32,i32)){
		self.center = center;
	}
}
	
//元祖结构体
struct Color(i32,i32,i32);

impl Color{
	fn print(&self){
		println!("Color({},{},{})",self.0,self.1,self.2)
	}
}

fn main(){
	let mut circle = Circle::new((0,0),3);

	println!("circle area = {},center = {:?}",circle.area(),circle.center);

	circle.move_to((30,30));

	println!("circle area = {},center = {:?}",circle.area(),circle.center);

	//局部更新语法
	let circle2 = Circle{
		radius:34,
		..circle
	};
	println!("circile2 is {:?},{:#?}",circle2,circle2);

	let color = Color(1,2,3);
	color.print();
}
