import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class GestureRecognizerDemo extends StatefulWidget {
  const GestureRecognizerDemo({super.key});

  @override
  State<GestureRecognizerDemo> createState() => _GestureRecognizerDemo();
}

class _GestureRecognizerDemo extends State<GestureRecognizerDemo> {
  final _tapGestureRecognizer = TapGestureRecognizer();
  bool _toggle = false; //变色开关

  @override
  void dispose() {
    //用到GestureRecognizer的话一定要调用其dispose方法释放资源
    _tapGestureRecognizer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text.rich(
        TextSpan(
          children: [
            const TextSpan(text: "你好世界"),
            TextSpan(
              text: "点我变色",
              style: TextStyle(
                fontSize: 30.0,
                color: _toggle ? Colors.blue : Colors.red,
              ),
              recognizer: _tapGestureRecognizer
                ..onTap = () {
                  setState(() {
                    _toggle = !_toggle;
                  });
                },
            ),
            const TextSpan(text: "你好世界"),
          ],
        ),
      ),
    );
  }
}
