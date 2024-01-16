import 'dart:math';

class Point {
  double x;
  double y;

  Point(this.x, this.y);

  double distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }

  //操作符重载
  Point operator +(Point v) => Point(x + v.x, y + v.y);
  Point operator -(Point v) => Point(x - v.x, y - v.y);

  //override接口
  @override
  bool operator ==(Object other) =>
      other is Point && x == other.x && y == other.y;

  //getter与setter
  double get sum{
    return x + y;
  }
  set sum(double value){
    if( value != 0 ){
      throw Exception('must be zero');
    }
    x = 0;
    y = 0;
  }

  @override
  int get hashCode => Object.hash(x, y);

  @override
  String toString(){
    return 'Point(x=$x,y = $y)';
  }
}

testClassMethodBasic(){
  var point = Point(1,2);
  point.sum = 0;
  point.x = 10;
  point.y = 20;
  var point2 = point+point;
  print('point = $point, point2 = $point2, if point == point2 : ${point==point2}');

  print('point to point2 distance = ${point.distanceTo(point2)}');
}

extension isBlankString on String {
  bool get isBlank => trim().isEmpty;
}

testClassMethodExtension(){
  var mm = 'cc';
  print('$mm is blank = ${mm.isBlank}');
}

class WannabeFunction {
  //直接用call来创建对象即可
  String call(String a, String b, String c) => '$a $b $c!';
}

testClassMethodCallable(){
  var wf = WannabeFunction();
  var out = wf('Hi', 'there,', 'gang');
  print('WannabeFunction is $out');
}

testClassMethod(){
  testClassMethodBasic();
  testClassMethodExtension();
  testClassMethodCallable();
}