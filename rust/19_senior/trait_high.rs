struct Counter{
	begin:u32,
	total:u32,
}

impl Counter{
	fn new(total:u32)->Counter{
		return Counter{
			begin:0,
			total:total,
		}
	}
}

/*
trait Iterator {
	//这是Iterator的Trait的定义，type Item称为关联类型，用来实现trait的参数与返回值的类型抽象
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
*/

impl Iterator for Counter{
	type Item = u32;

	fn next(&mut self)->Option<Self::Item>{
		self.begin = self.begin + 1;
		if self.begin == self.total + 1 {
			return None;
		}else{
			return Some(self.begin-1);
		}
	}
}

fn run1(){
	let counter = Counter::new(12);

	let data = counter.map(|x|x*2).collect::<Vec<_>>();
	println!("{:?}",data)
}

use std::ops::Add;

#[derive(Debug, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

struct Point3D{
	x:i32,
	y:i32,
	z:i32,
}

/*
add trait是范型trait，它的范型参数是带有默认类型参数，所以我们可以省略地使用Add trait，也可以实现特殊的类型的add trait
trait Add<RHS=Self> {
    type Output;

    fn add(self, rhs: RHS) -> Self::Output;
}
*/

//通过实现Add trait来达到运算符重载的目的
impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

impl Add<(i32,i32)> for Point{
	type Output = Point;

	fn add(self,other:(i32,i32))->Point{
		Point{
			x:self.x + other.0,
			y:self.y + other.1,
		}
	}
}

fn run2() {
    let p1 = Point { x: 1, y: 0 };
    let p2 = Point{ x:2 ,y : 2 };
    let p3 = p1 + p2;

    println!("p3 = {:?}",p3);

    let p4 = (7,8);
    let p5 = p3 + p4;

    println!("p5 = {:?}",p5)
}


use std::fmt;

//OutlinePrint是一个派生的trait，它派生自Display的Trait
//并且它自带了自己的默认实现
trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}

//Point直接使用OutlinePrint trait的默认实现
impl OutlinePrint for Point {}

//但是point需要显式地实现Display才能使用Outline trait，因为Outline trait派生自Display
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Point({}, {})", self.x, self.y)
    }
}

fn run3(){
	let p = Point{x:33,y:44};
	p.outline_print();
}

pub fn run(){
	run1();
	run2();
	run3();
}