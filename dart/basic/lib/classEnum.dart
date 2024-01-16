enum Color { 
  red('红色'), 
  green('绿色'), 
  blue('蓝色');

  //构造函数必须是const的，因此成员变量也必须是final的
  final String label;
  const Color(this.label);

  @override
  String toString(){
    //每个枚举都有一个index
    return 'color:$label, index $index';
  }
}

testClassEnum(){
  var color1 = Color.red;
  print('color1 = $color1');

  //默认有values，可以获取所有枚举值
  var allColors = Color.values;
  print('allColors = $allColors');
}