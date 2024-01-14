//position 参数，[]是可选标记，里面可以填写默认值，对于nullable类型默认值就是null
int maxNumber(int a, int b,[bool? enableNegation,int defaultPlus=0]){
  if(enableNegation != null && enableNegation ){
    a = -a;
    b = -b;
  }
  int result;
  if( a> b){
    result = a;
  }else{
    result = b;
  }
  return result + defaultPlus;
}

testPositionFunction(){
  print('-------testPositionFunction---------');
  print('${maxNumber(1,2)}');
  print('${maxNumber(1,2,true)}');
  print('${maxNumber(1,2,false,100)}');
}

//name参数，nullable参数可以不填写默认值，非nullable参数必须填写默认值。一种特殊情况是，非nullable参数不需填写默认值，但需要required标记。
int maxNumber2({required int left, required int right,bool? enableNegation,int defaultPlus=0}){
  if(enableNegation != null && enableNegation ){
    left = -left;
    right = -right;
  }
  int result;
  if( left> right){
    result = left;
  }else{
    result = right;
  }
  return result + defaultPlus;
}

testNameFunction(){
  print('-------testNameFunction---------');
  print('${maxNumber2(left:1,right:2)}');
  print('${maxNumber2(left:1,right:2,enableNegation:true)}');
  print('${maxNumber2(left:1,right:2,enableNegation:false,defaultPlus:100)}');
}



//定义函数参数
int combineNumber(int left,int right,int Function(int left,int right) handler){
  return handler(left,right);
}

//可以用typedef来定义函数参数类型
typedef HandlerType = int Function(int a, int b);
int combineNumber2(int left,int right,HandlerType handler){
  return handler(left,right);
}

testLambada(){
  print('-------testLambada---------');
  //普通括号lambda是需要return
  var c1 = combineNumber(1,2,(left,right){
    return left+right;
  });
  //箭头lambda是立即value
  var c2 = combineNumber(1,2,(left,right)=>left-right);

  print('c1 = $c1,c2 = $c2');
}

testFunction(){
  testPositionFunction();
  testNameFunction();
  testLambada();
}
