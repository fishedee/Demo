import './classBasicInner.dart';

testClassBasic(){
    var p = Person(33);
    print('person: name = ${p.name} , age = ${p.age} ,height = ${p.height} color = ${p.color}');

    p.age = 121;
    p.name = "Fish";

    //以下语句在编译时报错，因为_color是私有变量
    //print('${p._color}');


    //以下语句在编译时保存，因为height是final变量，不能修改
    //p.height = 33;

    //color是setter方法，不是真实的变量
    p.color = 'green';


    //以下语句在运行时报错，因为width是late变量，width还没初始化就执行getter
    //print(p.width);
    p.width = 100;
    print('width = ${p.width}');

    p.kk = 8;
    //以下语句在运行时报错，因为kk是late + final变量，不能二次赋值
    //p.kk = 9;

    //调用方法
    p.eat();
}