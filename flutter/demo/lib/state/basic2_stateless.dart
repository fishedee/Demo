import 'package:flutter/material.dart';

class BasicWidget2 extends StatelessWidget {
  const BasicWidget2({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MyText(text: "Hello World");
  }
}

class MyText extends StatelessWidget {
  const MyText({
    Key? key,
    required this.text,
    this.backgroundColor = Colors.grey, //默认为灰色
  }) : super(key: key);

  final String text;
  final Color backgroundColor;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: backgroundColor,
        child: Text(text, textDirection: TextDirection.ltr),
      ),
    );
  }
}
