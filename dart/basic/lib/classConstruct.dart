class Shape{
  String _name;
  Shape({String name = 'default'}):_name = name;
}

String prefixName(String name){
  return "prefix_$name";
}

double addTen(double a){
  return a+10;
}


//继承
class Point extends Shape {
  double x = 0;
  double y = 0;

  //参数上直接用this来指定变量，无名称的是默认构造函数
  //这里使用了position parameter
  Point(this.x, this.y);

  //默认构造函数只有一个，第二个构造函数，需要名字，例如这个origin名字
  //这里使用了name parameter
  Point.origin({required this.x, required this.y});


  //使用初始化列表来初始化参数
  Point.origin2({required double x1, required double y1})
    : x = x1,
      y = y1;

  //调用同级的构造函数
  Point.diag(double x): this(x,x);

  //调用父级的构造函数
  Point.withName(String name,this.x,this.y):super(name:name);

  //调用父级的构造函数，初始化列表允许使用函数
  Point.withName2(String name,this.x,this.y):super(name:prefixName(name));

  //私有的构造函数，外部不能调用
  Point._my(this.x,this.y):super(name:'_myPoint'){
    print('_my constructor init');
  }

  //工厂构造函数，有完善的构造体，可以对参数进行任意转换，返回值必须是Point，不能为null
  factory Point.shiftTen(double x,double y){
    return Point._my(x+10,y+10);
  }

  //覆盖方法
  @override
  String toString() {
    return 'Point(x:$x,y:$y,name:${super._name})';
  }
}

//不可变的类型
class ImmutablePoint{
  //不可变类型的变量都必须是final
  final double x;
  final double y;

  const ImmutablePoint(this.x,this.y);

  //不可变类型的初始化列表，不能使用函数，以下语句编译时报错
  //const ImmutablePoint.gg(x2,y2):x = x2,y = addTen(y2);
}

testClassConstruct(){
  //构造函数可以不需要new关键字
  var a = new Point(10,10);
  var b = new Point.origin(x: 20, y: 20);
  var c = Point.origin2(x1: 30, y1: 30);
  var d = Point.withName("g1", 40,50);
  var e = Point.withName2("g2",60,70);
  var f = Point.diag(80);

  //工厂构造函数的调用，和普通构造函数是一样的
  var g = Point.shiftTen(90, 90);

  print('testClassConstruct a = $a, b = $b , c = $c, d = $d, e = $e , f = $f , g = $g');
}