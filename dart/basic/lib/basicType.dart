//只有int与double两种数值类型 
//没有short,long,byte
//也没有float
testNumber(){
    var a = 1; // 推导为int类型
    var b = 2.2; // 推导为double类型
    const c = 1; //常量声明
    double d = 1; //显式类型声明
    int e = 12;//显式类型声明
    num f = 1e12;//声明num类型
    a += 1;
    b += 2;
    e += 3;
    print([a,b,c,d,e,f]);
}

testString() {
    var a = 'aA'; // 推导为string类型
    const b = 'b'; // 推导为string为b的类型
    a += '1';
    var c = 'Single quotes work well for string literals.';
    var d = 'a:[$a]';//变量插入
    var e = 'a:[${a.toUpperCase()}]';//调用变量的函数
    var f = '''
You can create
multi-line strings like this one.
''';//多行文本
    var g = r'In a raw string, not even \n gets special treatment.';//\n不转义，因为有r
    print([a,b,c,d,e,f,g]);
}

testBoolean(){
    var a = true;
    var b = !false;
    print([a,b]);
}

testDynamic(){
  //dynamic编译时不检查，动态时检查，相当于typescript的any类型
  dynamic c = 3;
  //dynamic在编译时可以调用任意的方法，运行时进行匹配，下面代码运行时会报错
  //c.toUppercase(2,3);
  
  //这一句可以执行；
  print('c is $c and isEven:${c.isEven}');

  //dynamic 可以赋值为null类型
  c = null;
  print('c is $c when c is null');
}

testObject(){
  //Object编译时检查，动态时不需检查，相当于typescript的unknown类型
  Object d = 4;
  
  //Object在编译时会进行检查，所有的类型都是Object类型，下面代码编译时会报错
  //d.isEven
  
  //有了is操作符判断以后就可以了
  if( d is int){
    print('d is $d and isEven:${d.isEven}');
  }

  //Object不能赋值为null类型，但Object?可以
  //d = null;//报错
  Object? d2 = 88;
  d2 = null;
  print('d2 is $d2 when d2 is null');
}

testTypeCheckAndConvert(){
  Object a = 123;
  //is和is!操作符
  print('a is number = ${a is num}');
  print('a is double = ${a is double}');
  print('a is not string = ${a is! String}');

/* 以下代码报错，因为as类型转换失败
Unhandled exception:
type 'int' is not a subtype of type 'String' in type cast
*/
  Object aStr = a as String;
  print('a is str !');
}

testType(){
    testNumber();
    testString();
    testBoolean();
    testDynamic();
    testObject();
    testTypeCheckAndConvert();
}