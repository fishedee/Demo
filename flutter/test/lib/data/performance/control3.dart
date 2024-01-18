import 'dart:developer';

import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Page1(),
    ),
  );
}

class Page1 extends StatefulWidget{

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
  void initState(){
    super.initState();
    controller = AnimationController(duration: const Duration(seconds: 2), vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    const curve = Curves.ease;
    //仅触发一次
    print('parent render');
    var tween = Tween<double>(begin: 100.0, end: 10).chain(CurveTween(curve: curve));
    var animation = controller.drive(tween);
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child:Column(
          children: [
            ElevatedButton(
                onPressed: () {
                  controller.forward();
                },
                child: const Text('Go!')
            ),
            AnimatePadding(
              animation:animation,
               widget:RedText(text: text)
            )
          ],
        )
      ),
    );
  }
}

class AnimatePadding extends AnimatedWidget{

  final Widget widget;

  final Animation<double> animation;

  const AnimatePadding({super.key,required this.widget,required this.animation}):super(listenable: animation);

  @override
  Widget build(BuildContext context) {
    //触发了很多次的build，因为每次的RedText都是重新创建的
    return Padding(
      padding:EdgeInsets.symmetric(vertical: animation.value),
      child:widget,
    );
  }
}


class RedText extends StatelessWidget{
  final String text;
   const RedText({super.key,required this.text});

  @override
  Widget build(BuildContext context) {
    //仅仅触发了一次的build，AnimatePadding使用的是final的widget，仅传递了一次，不需要重绘
    print('red text build3');
    return Container(
      color:Colors.redAccent,
      constraints: const BoxConstraints(maxHeight: 200,maxWidth: 100),
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Text(text)
    );
  }
}