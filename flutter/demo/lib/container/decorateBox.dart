import 'package:flutter/material.dart';

class DecorateBoxDemo extends StatelessWidget {
  const DecorateBoxDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
        child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                  colors: [Colors.red, Colors.orange.shade700]), //背景渐变
              //边框，仅仅下边框
              border: const Border(
                  bottom: BorderSide(color: Colors.blue, width: 2)),
              //全边框
              //border: Border.all(color: Colors.blue, width: 1),
              //3像素圆角
              borderRadius: BorderRadius.circular(3.0),
              boxShadow: const [
                //阴影
                BoxShadow(
                    color: Colors.black54,
                    offset: Offset(2.0, 2.0),
                    blurRadius: 4.0)
              ],
            ),
            child: const Padding(
              padding: EdgeInsets.symmetric(horizontal: 80.0, vertical: 18.0),
              child: Text(
                "Login",
                style: TextStyle(color: Colors.white),
              ),
            )));
  }
}
