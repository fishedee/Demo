import 'dart:async';

testExceptionInner2(Function() handler){
  try {
    handler();
  } on TimeoutException {
    //只指定了捕捉的类型，不获取异常变量
    print('timeout exception');
  } on Exception catch (e) {
    //既指定了捕捉的类型，也获取异常变量
    //e 是Exception类型
    print('Unknown exception: $e');
  } catch (e,stack) {
    //e 是Object类型，第二个参数固定为stack
    print('Something really unknown: $e, stack: $stack');
    //重新抛出异常
    rethrow;
  }finally{
    print('finish');
  }
}

testExceptionInner(){
  print('-----------testExceptionInner-----------');
  testExceptionInner2((){
    throw new TimeoutException('cc');
  });
  testExceptionInner2(() {
    throw new Exception('jj');
  });
  try{
    testExceptionInner2((){
      throw 'kk';
    });
  }catch(e){

  }
}
testException(){
  testExceptionInner();
}