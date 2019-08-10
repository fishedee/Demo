struct Context{
	data:String
}

//因为Context类型没有生命周期标注，所以，它的引用类型也不需要标注自身的生命周期
struct Parser<'a>{
	context:&'a Context
}

struct Context2<'a>{
	data:&'a String
}

//因为Context2类型有生命周期标注，所以，它的引用类型必须标注自身的生命周期
//但是，这样用Parser2的生命周期来确定Context2的生命周期，意味着Context2的字段都受限于Parser2的生命周期，这会出现使用方的缺陷
struct Parser2<'a>{
	context:&'a Context2<'a>
}

impl<'a> Parser2<'a>{
	fn parse(&self)->&str{
		return &self.context.data[1..];
	}
}

fn go2<'a>(context:&'a Context2) -> &'a str{
	//下面这一行会出错，因为parse的返回值的生命周期与Parser2的生命周期一样，当Parser2结束时，它标注的引用就已经结束了，把它传递给返回值的&str就会出错
	//问题的关键在于，&str的生命周期是与context的自身的生命周期有关，而不是与Parser2有关才是对的。
	//return Parser2{context:context}.parse();
	//
	return context.data;
}

struct Context3<'a>{
	data:&'a String
}

//注意应该区分Context3和Parser3的参数
struct Parser3<'a,'s>{
	context:&'a Context3<'s>
}

impl<'a,'s> Parser3<'a,'s>{
	//现在这样就能指定返回值的&str的生命周期与Context3有关，而不是与Parser3有关
	fn parse(&self) -> &'s str {
        return &self.context.data[1..]
    }
}

fn go3<'a>(context:&'a Context3) -> &'a str{
	//现在就没问题了
	return Parser3{context:context}.parse();
}

//注意，rust的具体类型是包含了生命周期的实际类型，不同的生命周期可以看成是不同的类型（虽然它们的实例化的代码是一致的）
//所以，这里的T是不需要做生命周期标注的。
struct Pointer<'a,T>{
	data:&'a T
	//错误，这样填写是错误的，T已经是包含了生命周期的，不能再填写了
	//data:&'a T<'a>
}

impl<'a,T> Pointer<'a,T>{
	fn get_ref(&self)->&'a T{
		return self.data;
	}
}

fn go4<'a>(context:&'a Context3)->&'a str{
	return Pointer{data:context}.get_ref().data;
}

pub fn run(){
	{
		let r = "asdfasdf".to_string();
		let a = Context2{data:&r};
		let _ = go2(&a);
	}
	{
		let r = "asdfasdf".to_string();
		let a = Context3{data:&r};
		let _ = go3(&a);
	}
	{
		let r = "asdfasdf".to_string();
		let a = Context3{data:&r};
		let _ = go4(&a);
	}
}
