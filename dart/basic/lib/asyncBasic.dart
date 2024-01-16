import 'dart:async';
import 'dart:isolate';

import 'package:http/http.dart' as http;

//async和await执行，相当简单
testHttpRequest() async {
  final response = await http.get(Uri.parse('http://www.baidu.com/'));
  if (response.statusCode == 200) {
    // 请求成功，你可以处理响应的数据
    print('Response data: ${response.body}');
  } else {
    // 请求失败，处理错误信息
    print('Failed to load data. Status code: ${response.statusCode}');
  }
}

//在async中切换到其他线程执行，将结果发射回来
int slowFib(int n) => n <= 1 ? 1 : slowFib(n - 1) + slowFib(n - 2);

void testIsolateRun() async {
  var result = await Isolate.run(() => slowFib(10));
  print('Fib(10) = $result');
}

//参考这里的范例，https://dart.dev/language/isolates
void testCompleter() async {
  //completer，需要在同一个isolate中使用，不能在不同isolate之间传递
  final completer = Completer<int>();

  //不同isolate之间只能使用SendPort和ReceivePort来传递信息
  final receivePort = ReceivePort();

  //启动Isolate，不同Isolate之间内存也是不共享的
  await Isolate.spawn(_isolatedFunction, receivePort.sendPort);

  //侦听结果信息
  receivePort.listen((data) {
    if (data is int) {
      completer.complete(data);
    } else if (data is String) {
      completer.completeError(data);
    }
  });

  //等待completer的结果
  var result = await completer.future;
  print('Fib2(20) = $result');

  //关闭receivePort，从而让listen关闭。并且isolate停止，才能让程序退出
  receivePort.close();
}

void _isolatedFunction(SendPort sendPort) {
  // This is executed in the spawned isolate
  try {
    var result = slowFib(20);
    sendPort.send(result); // Sending the result back to the main isolate
  } catch (e) {
    sendPort.send('Error: $e'); // Sending an error message back to the main isolate
  }
}

testAsyncBasic(){
  //testHttpRequest();
  testIsolateRun();
  testCompleter();
}