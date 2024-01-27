import 'package:flutter/material.dart';

class PopScopeDemo extends StatefulWidget {
  const PopScopeDemo({
    Key? key,
  }) : super(key: key);

  @override
  WillPopScopeTestRouteState createState() {
    return WillPopScopeTestRouteState();
  }
}

class WillPopScopeTestRouteState extends State<PopScopeDemo> {
  bool canPopScope = false;

  final snackBar = SnackBar(
    content: const Text('1秒内再按一次确认返回'),
    duration: const Duration(seconds: 1),
    action: SnackBarAction(
      label: '',
      onPressed: () {
        // Some code to undo the change.
      },
    ),
  );

  DateTime? _lastPressedAt;

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvoked: (didPop) {
        if (didPop) {
          return;
        }
        if (_lastPressedAt == null ||
            DateTime.now().difference(_lastPressedAt!) >
                const Duration(seconds: 1)) {
          //两次点击间隔超过1秒则重新计时
          _lastPressedAt = DateTime.now();
          ScaffoldMessenger.of(context).showSnackBar(snackBar);
          setState(() {
            canPopScope = false;
          });
          return;
        }
        ScaffoldMessenger.of(context).hideCurrentSnackBar();
        Navigator.pop(context);
      },
      child: Container(
        alignment: Alignment.center,
        child: const Text("1秒内连续按两次返回键退出"),
      ),
    );
  }
}
