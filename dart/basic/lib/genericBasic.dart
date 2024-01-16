//泛型函数
T printTemp<T>(T a){
  print('${a}_temp');
  return a;
}

//extends指定了泛型的上界
T printTemp2<T extends num>(T a){
  print('${a}_temp2');
  var c = a+1;
  //dart的泛型是运行时泛型，所以可以用is T的操作
  if( c is T){
    return c;
  }
  throw Exception('invalid $c');
}

//默认泛型参数为T的时候，允许传入nullable类型
//使用T extends Object的时候，不允许传入nullable类型
class SimpleData<T extends Object>{
    T? _data;

    set(T t){
        _data = t;
    }

    T? get(){
      return _data;
    }
}

class Person{
  String name;
  int age;
  Person(this.name,this.age);
}

class Man extends Person{
  Man(super.name,super.age);
}

testGeneric(){
  printTemp(null);
  printTemp(1);
  printTemp('abc');
  printTemp2(12);
  printTemp2(12.3);

  var data1 = SimpleData<int>();
  data1.set(123);
  print("data1 ${data1.get()}");

  var data2 = SimpleData<Person>();
  data2.set(Person("cat",879));
  print("data2 ${data2.get()}");
  //这里会报错，因为类型不匹配
  //data2.set(123)

  //这里会报错，因为不能使用nullable类型
  //var data3 = SimpleData<Person?>();

  //dart中没有协变，和逆变的说法，所以以下代码
  //编译时没有问题，但是运行时报错
  //在Kotlin中，不可变数组才是协变，才能允许将List<Man>赋值到List<Person>的。可变数组不是协变，不允许这样赋值的，在编译时确定错误
  List<Man> list = List.empty();
  List<Person> list2 = list;
  list2.add(Person('cc',33));
}