//定义抽象类
abstract class Square{
  //定义抽象方法，无需abstract前缀
  String getName();
}

//每个类，都是一个接口
//extends继承
class Circle extends Square{
  //override 覆盖方法
  @override
  String getName(){
    return 'circle';
  }

  double _radius;

  Circle(this._radius);

  double getRadius(){
    return _radius;
  }
}

//实现接口，用implements，建议不要使用class直接用interface，这样连私有变量的getter/setter都需要实现。
class MCricle extends Square implements Circle{

  //私有变量_radius的getter/setter都需要实现。
  @override
  double get _radius{
    return _radius2;
  }

  @override
  set _radius(double value){
    _radius2 = value;
  }

  double _radius2;

  MCricle(this._radius2);

  @override
  double getRadius(){
    return _radius2;
  }

  @override
  String getName(){
    return 'mcircle';
  }
}

//需要用abstract interface，才能实现Kotlin中的interface中意义。
abstract interface class ShapeInterface{
  double getRadius();
  String getName();
} 

class MCircle2 implements ShapeInterface{
  
  double _radius2;

  MCircle2(this._radius2);

  @override
  double getRadius(){
    return _radius2;
  }

  @override
  String getName(){
    return 'mcircle2';
  }
}

//定义一个mixin类，并且要求使用这个mixin的类都需要实现SquareInterface接口，on是可选操作
//相当于kotlin中的by，有自己的变量和方法
mixin ColorShape on ShapeInterface{
  String color = "red";

  debugInfo(){
    print('Square name is ${getName()} , radius is ${getRadius()}, color is $color');
  }
}

//实现shape接口，并且使用ColorShape的with
class ColorSquare extends ShapeInterface with ColorShape{

  @override
  double getRadius(){
    return 50;
  }

  @override
  String getName(){
    return 'colorSquare';
  }
}

testClassInterface(){
  var circle = Circle(11);
  print('circle radius is ${circle.getRadius()},name is ${circle.getName()}');

  var circle2 = MCricle(12);
  print('circle2 radius is ${circle2.getRadius()},name is ${circle2.getName()}');

  ShapeInterface circle3 = MCircle2(10);
  print('circle3 radius is ${circle3.getRadius()},name is ${circle3.getName()}');

  var square = ColorSquare();
  square.color = 'blue';
  square.debugInfo();
}