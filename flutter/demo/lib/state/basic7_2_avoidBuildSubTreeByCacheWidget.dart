import 'dart:developer';

import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Page1(),
    ),
  );
}

class ShouldRebuildWidget<T extends Widget> extends StatefulWidget {
  final bool Function(T oldWidget) shouldRebuild;

  final T Function() build;

  const ShouldRebuildWidget(
      {super.key, required this.shouldRebuild, required this.build});

  @override
  State<ShouldRebuildWidget<T>> createState() => _ShouldRebuildWidget<T>();
}

class _ShouldRebuildWidget<T extends Widget>
    extends State<ShouldRebuildWidget<T>> {
  T? _oldWidget;

  @override
  Widget build(BuildContext context) {
    var old = _oldWidget;
    if (old == null || widget.shouldRebuild(old)) {
      var newWidget = widget.build();
      _oldWidget = newWidget;
      return newWidget;
    }
    return old;
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

    return Scaffold(
      appBar: AppBar(),
      body: Center(
          child: Column(
        children: [
          ElevatedButton(
              onPressed: () {
                controller.forward();
              },
              child: const Text('Go!')),
          SizedBox(height: tween.evaluate(controller)),
          //使用缓存方式的Widget，可以避免渲染子组件
          ShouldRebuildWidget(
              build: () => RedText(text: text),
              shouldRebuild: (oldWidget) => oldWidget.text != text)
        ],
      )),
    );
  }
}

class RedText extends StatelessWidget {
  final String text;
  const RedText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    //触发了很多次的build，因为每次的RedText都是重新创建的
    print('red text build4');
    return Container(
        color: Colors.redAccent,
        constraints: const BoxConstraints(maxHeight: 200, maxWidth: 100),
        padding: const EdgeInsets.symmetric(horizontal: 8),
        child: Text(text));
  }
}
