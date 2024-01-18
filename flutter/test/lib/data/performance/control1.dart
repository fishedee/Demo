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
     const begin = Offset(0.0, 100.0);
      const end = Offset.zero;
      const curve = Curves.ease;

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

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
             SlideTransition(
                position: controller.drive(tween),
                child:RedText(text:text)
             )
          ],
        )
      ),
    );
  }
}

class RedText extends StatelessWidget{
  final String text;
   const RedText({super.key,required this.text});

  @override
  Widget build(BuildContext context) {
    //只触发了1次build，因为变化的SlideTransition只capture了一次RedText
    //RedText一直是保持不变的
    print('red text build');
    return Container(
      color:Colors.redAccent,
      constraints: const BoxConstraints(maxHeight: 200,maxWidth: 100),
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child:Text(text)
    );
  }
}