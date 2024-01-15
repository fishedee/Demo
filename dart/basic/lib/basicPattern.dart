testPatternUseCase(){
  print('-----------testPatternUseCase-----------');
  //变量声明
  var (a1, [b1, c1]) = ('str', [1, 2]);
  print('$a1 $b1 $c1'); 

  //变量赋值
  var (a2, b2) = ('left', 'right');
  (b2, a2) = (a2, b2); // Swap.
  print('$a2 $b2'); 

  //switch表达式
  dynamic obj = 1;
  switch (obj) {
    // Matches if 1 == obj.
    case 1:
      print('one');

    // Matches if the value of obj is between the
    // constant values of 'first' and 'last'.
    case >= 10 && <= 20:
      print('in range');

    // Matches if obj is a record with two fields,
    // then assigns the fields to 'a' and 'b'.
    case (var a, var b):
      print('a = $a, b = $b');

    default:
  }

  //for表达式
  Map<String, int> hist = {
    'a': 23,
    'b': 100,
  };

  for (var MapEntry(key: key, value: count) in hist.entries) {
    print('$key occurred $count times');
  }

  //if case表达式
  Object input = (1,'33');
  if( input case (1,String _)){
    print('(int 1 and String)');
  }else if(input case(int _,String _)){
    print('(int and String)');
  }else{
    print('other');
  }

  //也能用于json校验
  Object json = {'user':['fish',123],'user2':['bb',456]};
  if (json case {'user': [String name, int age]}) {
    print('User $name is $age years old.');
  }
}

testPatternMatchValue(){
  print('-----------testPatternMatchValue-----------');
  var handler1 = ((Object? a){
    const jj = (1,'cc');
    switch(a){
      case 10:
        print('10');
      case 'cc':
        print('cc');
      case null:
        print('null');
      case jj:
        print('match constant jj');
      case _:
        print('other');
    }
  });
  handler1(10);
  handler1('cc');
  handler1(null);
  handler1((1,'cc'));
  handler1({'c'});
}

testPatternMatchCast(){
   print('-----------testPatternMatchCast-----------');
   var handler1 = ((dynamic a){
    switch(a){
      //只有非空时才匹配，空的时候不匹配，也不抛异常
      case var a1?:
        print('a1 is not null');
      case _:
        print('other');
    }
  });
  handler1(10);
  handler1(null);

  var handler2 = ((dynamic a){
    switch(a){
      //非空与空时都匹配，空的时候会抛异常，相当于cast为非空类型。
      case var a1!:
        print('a1 must nullable');
      case _:
        print('other');
    }
  });
  handler2(10);
  //以下语句会抛出异常，因为a1！匹配遇到null，会抛出异常
  //handler2(null);

  var handler3 = ((dynamic a){
    switch(a){
      //非空与空时都匹配，空的时候不抛异常
      case var a1:
        print('a1 is null or not-null');
      case _:
        print('other');
    }
  });
  handler3(10);
  handler3(null);

  
  var handler4 = ((dynamic a){
    switch(a){
      //非空时，匹配a1，且cast为String类型，如果cast失败，会抛出异常
      case var a1 as String:
        print('a1 must String');
      case _:
        print('other');
    }
  });
  //以下语句会抛出异常，因为a1匹配遇到到非string，会抛出异常
  //handler4(10);
  handler4('bb');
}

class MyRect{
  int x;
  int y;
  int width;
  int height;
  MyRect({required this.x,required this.y, required this.width, required this.height});
}

testPatternMatchType(){
  print('-----------testPatternMatchType-----------');
  var handler1 = ((Object object){
    switch(object){
      case int a:
        print('int $a');
      case [var a, var b]:
        print('lsit: two [$a,$b]');
      case [var a, ...var rest, var b]:
        print('list: three or more, inner is $rest');
      case {"name":String name}:
        print('map: name with String value: $name');
      case {"name":var name}:
        print('map: name with any value: $name');
      case (var first,var second):
        print('record: position (first,second)');
      case (name1:var name1,name2:var name2):
        print('record: name($name1,$name2)');
      case MyRect(width:var width,height: var height)://通过object的getter来抽取变量
        print('myRect: width = $width,height = $height');
      case _:
        print('other');
    }
  });

  handler1(123);
  handler1([1,2]);
  handler1([1,2,3,4,5,6,7]);
  handler1({"name":"fish","age":123});
  handler1({"name":520});
  handler1(('fish',123));
  handler1(('fish',123,true));//不能匹配(var first,var second)
  handler1((name1:'jj',name2:'kk'));
  handler1((name1:'jj',name2:'kk',name3:'uu'));//不能匹配(name1:var name1,name2:var name2)
  handler1(MyRect(x:1,y:1,width:100,height:200));
}

testPatternMatchRelation(){
  print('-----------testPatternMatchRelation-----------');
   var handler1 = ((int char){
    const space = 32;
    const zero = 48;
    const nine = 57;
    const a = 97;
    const A = 65;

     switch (char) {
      case < space: 
        print('control');
      case == space:
        print('space');
      case > space && < zero:
        print('punctuation');
      case >= zero && <= nine:
        print('digit');
      case == a || == A:
        print('alpha A/a');
      default:
        print('other');
    };
  });
  handler1(' '.codeUnitAt(0));
  handler1('\t'.codeUnitAt(0));
  handler1('2'.codeUnitAt(0));
  handler1('a'.codeUnitAt(0));
  handler1('你'.codeUnitAt(0));
}

//pattern是类型与值的组合匹配工具，
//匹配以后还能进行cast操作，cast为非空类型，或者cast为指定类型，如果cast失败就会抛出异常
//匹配与cast以后还能解构取值
testPattern(){
  testPatternUseCase();
  testPatternMatchValue();
  testPatternMatchType();
  testPatternMatchCast();
  testPatternMatchRelation();
}