testList(){
  //推导为List<int>类型
  var list = [1, 2, 3];
  print(list);

  //创建空数组
  var list2 = List<int>.empty();
  print(list2);

  //增，删，改，查
  list.add(4);
  list.removeAt(0);
  list[2] = 33;
  print('list index 1 is ${list[1]}');
  print('list length is ${list.length}');

  //遍历
  for( final item in list){
    print('list item is :$item');
  }

  //list的控制流操作符
  var mm = 44;
  var list3 = [
    ...list,
    for(var i = 0 ;i != 10;i++) i, //在集合加入for
    if(mm<10) mm + 1, //在集合加入if
  ];
  print('list3 $list3');
}

testSet(){
 //推导为Set<string>类型
  var set1 = {'a1', 'a2', 'a3'};
  print(set1);

  //创建空数组
  var set2 = <int>{};
  print(set2);

  //增，删，改，查
  set1.add('a4');
  set1.remove('a2');
  print('set has a1 is: ${set1.contains('a1')}');
  print('set length is ${set1.length}');

  //遍历
  for( final item in set1){
    print('set item is :$item');
  }

  //set的控制流操作符
  var mm = 44;
  var set3 = {
    ...set1,
    for(var i = 0 ;i != 10;i++) 'a${i}', //在集合加入for
    if(mm>10) '${mm + 1}', //在集合加入if
  };
  print('set3 $set3');
}

testMap(){
 //推导为Set<string>类型
  var map1 = {
    'first1':'a1',
    'first2':'a2',
    'first3':'a3',
  };
  print(map1);

  //创建空数组
  var map2 = <int,String>{};
  print(map2);

  //增，删，改，查
  map1['first4'] = 'a4';
  map1.remove('first2');
  map1['first1'] = 'a1111';
  print('map has key first3 is: ${map1.containsKey('first3')}');
  print('map length is ${map1.length}');
  print('map value in key [first1] is ${map1['first1']}');

  //遍历
  for( final item in map1.entries){
    print('map item is :${item.key} value:${item.value}');
  }

  //map的控制流操作符
  var mm = 44;
  var map3 = {
    ...map1,
    for(var i = 0 ;i != 10;i++) 'first${i}':'b${i}', //在集合加入for
    if(mm>10) 'mm':'${mm + 1}', //在集合加入if
  };
  print('map3 $map3');
}

testPositionRecord(){
  print('-------- testPositionRecord ------');
  //position record
  var a = (1,'cc2');
  (int,String) b;
  b = a;
  print([a,b,a==b]);

  //record是immutable的，所有值不可修改
  //a.$1 = 22
  print('first is ${a.$1}, second is ${a.$2}');
}

testNameRecord(){
  print('-------- testNameRecord ------');
  //name record
  var a = (age:11,name:'fish');
  ({int age,String name}) b;
  b = a;
  print([a,b,a==b]);

  //name record比较的时候，名称也是一部分
  var c = (age2:11,name:'fish');
  print(a == c);

  //record是immutable的，所有值不可修改
  //a.$1 = 22
  print('name is ${a.name}, age is ${a.age}');
}

testMixRecord(){
  print('-------- testMixRecord ------');

  var record = ('first', a: 2, b: true, 'last');
  print('first : ${record.$1}, second : ${record.$2}');
  print('a : ${record.a}, b : ${record.b}');
}

testCollection(){
    testList();
    testSet();
    testMap();
    testPositionRecord();
    testNameRecord();
    testMixRecord();
}