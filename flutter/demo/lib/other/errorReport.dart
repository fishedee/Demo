import 'package:flutter/material.dart';
import 'dart:ui';

/*
//全局异常捕捉最好放在main之前执行。
main() async {
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    //myErrorsHandler.onErrorDetails(details);
  };
  PlatformDispatcher.instance.onError = (error, stack) {
    //myErrorsHandler.onError(error, stack);
    return true;
  };
  runApp(const ErrorReportDemo());
}
*/

class ErrorReportDemo extends StatelessWidget {
  const ErrorReportDemo({super.key});

  tryFail() async {
    await Future.delayed(const Duration(seconds: 1));
    throw Exception('fish is fail!');
  }

  @override
  Widget build(BuildContext context) {
    FlutterError.onError = (details) {
      FlutterError.presentError(details);
      print('onError $details');
      //myErrorsHandler.onErrorDetails(details);
    };
    PlatformDispatcher.instance.onError = (error, stack) {
      print('PlatformDispatcherError $error $stack');
      //myErrorsHandler.onError(error, stack);
      return true;
    };
    return MaterialApp(
        builder: (context, widget) {
          Widget error = const Text('...rendering error...');
          if (widget is Scaffold || widget is Navigator) {
            error = Scaffold(body: Center(child: error));
          }
          ErrorWidget.builder = (errorDetails) => error;
          if (widget != null) return widget;
          throw StateError('widget is null');
        },
        home: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                tryFail();
              },
              child: const Text("点我试试"),
            )
          ],
        ));
  }
}
