import 'dart:math';

import 'package:flutter/material.dart';

class TransformDemo extends StatelessWidget {
  const TransformDemo({
    Key? key,
  }) : super(key: key);

  //Transform，仅工作在paint阶段，不影响原来widget的layout阶段，不影响原来widget所在排版
  Widget _buildTransformTranslate() {
    return DecoratedBox(
      decoration: const BoxDecoration(color: Colors.red),
      //默认原点为左上角，左移20像素，向上平移5像素
      child: Transform.translate(
        offset: const Offset(-20.0, -5.0),
        child: const Text("Hello world"),
      ),
    );
  }

  Widget _buildTransformRotate() {
    return DecoratedBox(
      decoration: const BoxDecoration(color: Colors.red),
      child: Transform.rotate(
        //旋转90度
        angle: pi / 2,
        child: const Text("Hello world"),
      ),
    );
  }

  Widget _buildTransformScale() {
    return DecoratedBox(
        decoration: const BoxDecoration(color: Colors.red),
        child: Transform.scale(
            scale: 1.5, //放大到1.5倍
            child: const Text("Hello world")));
  }

  Widget _buildTransformDoNotChangeLayout() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        DecoratedBox(
            decoration: const BoxDecoration(color: Colors.red),
            child: Transform.rotate(
              angle: pi / 2, //旋转90度
              child: const Text("Hello world"),
            )),
        const Text(
          "你好",
          style: TextStyle(color: Colors.green, fontSize: 18.0),
        )
      ],
    );
  }

  Widget _buildRoratedBoxDoChangeLayout() {
    return const Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        DecoratedBox(
          decoration: BoxDecoration(color: Colors.red),
          //将Transform.rotate换成RotatedBox
          child: RotatedBox(
            quarterTurns: 1, //旋转90度(1/4圈)
            child: Text("Hello world"),
          ),
        ),
        Text(
          "你好",
          style: TextStyle(color: Colors.green, fontSize: 18.0),
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Align(
        child: Column(
      //显式指定对齐方式为左对齐，排除对齐干扰
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        _buildTransformTranslate(),
        const SizedBox(height: 50),
        _buildTransformRotate(),
        const SizedBox(height: 50),
        _buildTransformScale(),
        const SizedBox(height: 50),
        _buildTransformDoNotChangeLayout(),
        const SizedBox(height: 50),
        _buildRoratedBoxDoChangeLayout(),
        const SizedBox(height: 50),
      ],
    ));
  }
}
