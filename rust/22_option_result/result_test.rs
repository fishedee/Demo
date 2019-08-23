/*
Result的定义
enum Result<T,E> {
    Ok(T),
    Err(E),
}
*/

fn find(haystack: &str, needle: char) -> Result<usize,String> {
    for (offset, c) in haystack.char_indices() {
        if c == needle {
            return Ok(offset);
        }
    }
    return Err("can't not found string".to_string());
}

fn find_option(haystack: &str, needle: char) -> Option<usize> {
    for (offset, c) in haystack.char_indices() {
        if c == needle {
            return Some(offset);
        }
    }
    return None;
}

fn run1(){
	//unwrap
    //当前端返回Err(data)的时候panic
    //当前端返回Ok(data)的时候返回data
	let result1 = find("cde",'d').unwrap();
    println!("result1 = {}",result1);

    //unwrap_or
    //当前端返回Err(data)的时候or值
    //当前端返回Ok(data)的时候返回data
    let result2 = find("cde",'g').unwrap_or(9999);
    println!("result2 = {}",result2);
}

fn run2(){
    //map
    //当前端返回Err(data)的时候返回Err(data)
    //当前端返回Ok(data)的时候，就返回Ok(f(data));
    let result = find("cde",'d').map(|x|x*2);

    println!("find result {:?}",result);

    //map_err
    //当前端返回Err(data)的时候返回Err(f(data))
    //当前端返回Ok(data)的时候，就返回Ok(data);
    let result = find("cde",'g').map_err(|x|"fish_error: ".to_string()+&x);

    println!("find result {:?}",result);
}

fn run3(){
    //and_then
    //当前端返回Err(data)的时候返回Err(data)
    //当前端返回Ok(data)的时候，就返回f(data);
    let result = find("cde",'e').and_then(|x|{
        if x == 2{
            return Err("Oh no,can't not found in index 2".to_string());
        }else{
            return Ok(x*2);
        }
    });

    println!("find result {:?}",result);

    //or_else
    //当前端返回Err(data)的时候返回f(data)
    //当前端返回Ok(data)的时候，就返回Ok(data);
    let result = find("cde",'g').or_else(|x|{
        return Err("real can't not found");
    });

    println!("find result {:?}",result);
}

fn run4(){
	//ok_or
	//当前端返回None的时候，就返回Err(f())
	//当前端返回Some(data)的时候，就返回Ok(data);
	let result = find_option("cde",'g').ok_or("Please give a found string");
	println!("find result {:?}",result)
}


pub fn go(){
	run1();
	run2();
	run3();
	run4();
}