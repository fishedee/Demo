import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Echo(text: 'Hello World2'),
    ),
  );
}

class Echo extends StatelessWidget {
  const Echo({
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
