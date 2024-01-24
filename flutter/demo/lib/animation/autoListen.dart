import 'package:flutter/material.dart';

class AnimationAutoListenDemo extends StatefulWidget {
  const AnimationAutoListenDemo({Key? key}) : super(key: key);

  @override
  State<AnimationAutoListenDemo> createState() => _AnimationManualDemo();
}

//需要继承TickerProvider，如果有多个AnimationController，则应该使用TickerProviderStateMixin。
class _AnimationManualDemo extends State<AnimationAutoListenDemo>
    with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    //加入曲线做法
    animation = CurvedAnimation(parent: controller, curve: Curves.easeIn);

    //启动动画(正向执行)
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedImage(animation: animation),
    );
  }

  @override
  dispose() {
    //路由销毁时需要释放动画资源
    controller.dispose();
    super.dispose();
  }
}

class AnimatedImage extends AnimatedWidget {
  const AnimatedImage({
    Key? key,
    required this.animation,
  }) : super(key: key, listenable: animation);

  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    final value = Tween(begin: 0.0, end: 300.0).evaluate(animation);
    return Center(
      child: Image.asset(
        "assets/images/star.webp",
        width: value,
        height: value,
      ),
    );
  }
}
