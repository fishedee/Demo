struct Foo{
    x: &i32,
}

fn scope1() {
    let y = &5; 
    let f = Foo { x: y };

    //错误，x缺少生命周期描述
    println!("{}", f.x);
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
fn scope2() {
    let a = "hello";
    let result;
    {
        let b = String::from("world");
        //错误，a,b的生命周期比返回值短
        result = longest(a, b.as_str());
    }
    println!("The longest string is {}", result);
}

fn main(){
	scope1();
	scope2();
}
