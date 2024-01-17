/*
Putting it all together
The Fade-in text effect example demonstrates the following features of the AnimatedOpacity widget.

* It listens for state changes to its opacity property.
* When the opacity property changes, it animates the transition to the new value for opacity.
* It requires a duration parameter to define how long the transition between the values should take.
*/
// Copyright 2019 the Dart project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file.
// AnimatedOpacity用法
import 'package:flutter/material.dart';

const owlUrl =
    'https://raw.githubusercontent.com/flutter/website/main/src/assets/images/docs/owl.jpg';

class FadeInDemo extends StatefulWidget {
  const FadeInDemo({super.key});

  @override
  State<FadeInDemo> createState() => _FadeInDemoState();
}

class _FadeInDemoState extends State<FadeInDemo> {
  double opacity = 0;

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    return Column(children: <Widget>[
      Image.network(owlUrl, height: height * 0.8),
      TextButton(
        child: const Text(
          'Show Details',
          style: TextStyle(color: Colors.blueAccent),
        ),
        onPressed: () => setState(() {
          opacity = 1;
        }),
      ),
      AnimatedOpacity(
        duration: const Duration(seconds: 2),
        opacity: opacity,
        child: const Column(
          children: [
            Text('Type: Owl'),
            Text('Age: 39'),
            Text('Employment: None'),
          ],
        ),
      )
    ]);
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: FadeInDemo(),
        ),
      ),
    );
  }
}

void main() {
  runApp(
    const MyApp(),
  );
}
