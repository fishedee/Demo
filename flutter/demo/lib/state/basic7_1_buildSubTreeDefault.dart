import 'dart:developer';

import 'package:flutter/material.dart';

class BasicWidget7_1 extends StatelessWidget {
  const BasicWidget7_1({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Page1();
  }
}

class Page1 extends StatefulWidget {
  const Page1({super.key});

  @override
  State<StatefulWidget> createState() {
    return _Page1();
  }
}

class _Page1 extends State<Page1> with SingleTickerProviderStateMixin {
  late AnimationController controller;

  String text = "Hello World";

  @override
  void initState() {
    super.initState();
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    controller.addListener(() {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    const curve = Curves.ease;

    var tween =
        Tween<double>(begin: 100.0, end: 10).chain(CurveTween(curve: curve));

    return Center(
        child: Column(
      children: [
        ElevatedButton(
            onPressed: () {
              controller.forward();
            },
            child: const Text('Go!')),
        SizedBox(height: tween.evaluate(controller)),
        RedText(text: text)
      ],
    ));
  }
}

class RedText extends StatelessWidget {
  final String text;
  const RedText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    //触发了很多次的build，因为每次的RedText都是重新创建的
    print('red text build2');
    return Container(
        color: Colors.redAccent,
        constraints: const BoxConstraints(maxHeight: 200, maxWidth: 100),
        padding: const EdgeInsets.symmetric(horizontal: 8),
        child: Text(text));
  }
}
