/*
Option的定义
enum Option<T> {
    None,
    Some(T),
}
*/

fn find(haystack: &str, needle: char) -> Option<usize> {
    for (offset, c) in haystack.char_indices() {
        if c == needle {
            return Some(offset);
        }
    }
    return None;
}

fn run1(){
	//unwrap
    //当前端返回None的时候panic
    //当前端返回Some(data)的时候返回data
	let result1 = find("cde",'d').unwrap();
    println!("result1 = {}",result1);

    //unwrap_or
    //当前端返回None的时候or值
    //当前端返回Some(data)的时候返回data
    let result2 = find("cde",'g').unwrap_or(9999);
    println!("result2 = {}",result2);
}

fn run2(){
    //map
    //当前端返回None的时候返回None
    //当前端返回Some(data)的时候，就返回Some(f(data));
    let result = find("cde",'d').map(|x|x*2);

    println!("find result {:?}",result);
}

fn run3(){
    //and_then
    //当前端返回None的时候返回None
    //当前端返回Some(data)的时候，就返回f(data);
    let result = find("cde",'d').and_then(|x|{
        if x == 2{
            return None;
        }else{
            return Some(333);
        }
    });

    println!("find result {:?}",result);
}

pub fn go(){
	run1();
    run2();
    run3();
}