
//默认是不可以被继承的
class Person {
  //默认为public，自动有getter和setter
  var name = "fish";
  var age = 123;

  //final变量，只能在赋值，或者构造函数赋值，一旦赋值以后就无法更改
  final int height;

  Person(this.height);

  //下划线开头的是私有变量，没有getter，也没有setter
  //自定义getter与setter
  //getter与setter的名字不能与filed的名字一致
  var _color = "red";

  String get color{
      print("color getter run");
      return _color;
  }
  
  set color(String value) {
      print("color setter run");
      _color = value;
  }

  //late变量在运行时检查null方式
  late int width;

  //late + final，运行时检查null方式，运行时检查仅赋值一次
  late final int kk;

  eat(){
      print("$name is eating. He is $age years old. height = $height, width = $width, color = $_color ");
  }
}