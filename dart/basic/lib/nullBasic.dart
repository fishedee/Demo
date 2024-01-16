import 'dart:math';

bool random(){
  double randomDouble = Random().nextDouble();
  return randomDouble<0.5;
}

class Person{
  String name;
  int age;
  Person(this.name,this.age);
}

testNullBasic(){
  List<int>? a;
  if( random()){
    a = [1,2,3];
  }
  Person? b;
  if( random()){
    b = Person('fish',123);
  }
  print('a is $a and a[0] is ${a?[0]}');
  print('b is $b and a.name is ${b?.name}');

  //两个句号组成的，可以让返回值变为b本身，方便串联多个操作
  b?..name = 'cat'
    ..age = 234;
  print('after b is $b and a.name is ${b?.name}');
}