// Copyright 2019 the Dart project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file.
//AnimatedContainer用法
// Copyright 2019 the Dart project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file.

import 'dart:math';

import 'package:flutter/material.dart';

const _duration = Duration(milliseconds: 400);

double randomBorderRadius() {
  return Random().nextDouble() * 64;
}

double randomMargin() {
  return Random().nextDouble() * 64;
}

Color randomColor() {
  return Color(0xFFFFFFFF & Random().nextInt(0xFFFFFFFF));
}

class ImplicitAnimationDemo2 extends StatefulWidget {
  const ImplicitAnimationDemo2({super.key});

  @override
  State<ImplicitAnimationDemo2> createState() => _AnimatedContainerDemoState();
}

class _AnimatedContainerDemoState extends State<ImplicitAnimationDemo2> {
  late Color color;
  late double borderRadius;
  late double margin;

  @override
  void initState() {
    super.initState();
    color = randomColor();
    borderRadius = randomBorderRadius();
    margin = randomMargin();
  }

  void change() {
    setState(() {
      color = randomColor();
      borderRadius = randomBorderRadius();
      margin = randomMargin();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            SizedBox(
              width: 128,
              height: 128,
              child: AnimatedContainer(
                margin: EdgeInsets.all(margin),
                //可以使用curve的曲线插值
                curve: Curves.easeInOutBack,
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(borderRadius),
                ),
                duration: _duration,
              ),
            ),
            ElevatedButton(
              child: const Text('Change'),
              onPressed: () => change(),
            ),
          ],
        ),
      ),
    );
  }
}
