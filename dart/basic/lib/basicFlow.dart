String testWhile(){
    var out = "";
    var a = 0;
    while( a <= 10 ){
        out = out + a.toString() +" ";
        a++;
    }
    return out;
}

String testDoWhile(){
    var out = "";
    var a = 0;
    do{
        out = out + a.toString() +" ";
        a++;
    }while(a<=10);
    return out;
}


String testFor(){
  var out = "";
  for( var a = 0 ;a<=10;a++){
    out = out+a.toString() +" ";
  }
  return out;
}

String testForIn(){
  var out = "";
  for( var a in [1,2,3]){
    out = out + a.toString() +" ";
  }
  return out;
}

testAlwaysCaptureVarInLoop(){
  var callbacks = [];
  for (var i = 0; i < 2; i++) {
    callbacks.add(() => print('call $i'));
  }

  for (final c in callbacks) {
    c();
  }
}

testLoop(){
    print('testWhile: ${testWhile()}');
    print('testDoWhile: ${testDoWhile()}');
    print('testFor: ${testFor()}');
    print('testForIn: ${testForIn()}');
    print('testAlwaysCaptureVarInLoop: ${testAlwaysCaptureVarInLoop()}');
}

int testIf(int a,int b){
    if( a > b ){
        return a;
    }else{
        return b;
    }
}

String testIfCase(Object input){
  //if与模式匹配的组合，if case
  if( input case (1,String _)){
    return '(int 1 and String)';
  }else if(input case(int _,String _)){
    return '(int and String)';
  }else{
    return 'other';
  }

}

testCondtion(){
  print('testIf: ${testIf(33,44)}');
  print('testIfCase (1,2): ${testIfCase((1,2))}');
  print('testIfCase (\'cc\'): ${testIfCase('cc')}');
  print('testIfCase (2,\'c2\'): ${testIfCase((2,'c2'))}');
  print('testIfCase (1,\'c3\'): ${testIfCase((1,'c3'))}');
}

testFlow(){
  testLoop();
  testCondtion();
}