#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

impl<T:Copy> Point<T> {
	fn new(a:T,b:T)->Point<T>{
		return Point::<T>{
			x:a,
			y:b,
		}
	}

    fn x(&self) -> &T {
        &self.x
    }

    fn y(&self) -> &T {
        &self.y
    }

    fn mixup(&self,other :&Point<T>) -> Point<T> {
    	return Point {
            x: self.x,
            y: other.y,
        }
    }
}

//全特化
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest
}


fn main(){
	let a = Point::new(1,2);
	let b = Point::<i32>::new(3,4);
	println!("a = {:?},b = {:?}",a,b);

	let c = a.mixup(&b);
	println!("c = {:?},c.x = {},c.y = {}",c,c.x(),c.y());

	let d = Point::new(1.1,2.2);
	println!("d = {:?},distance_from_origin:{}",d,d.distance_from_origin());

	let list1 = [1,3,4,5,2,1,7,2];
	let list2 = [1.2,2.3,4.5,2.4,4.2];
	println!("list1 max {},list2 max {}",largest(&list1),largest(&list2));
}
