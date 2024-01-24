import 'package:flutter/material.dart';

class AnimationAutoListenDemo2 extends StatefulWidget {
  const AnimationAutoListenDemo2({Key? key}) : super(key: key);

  @override
  State<AnimationAutoListenDemo2> createState() => _AnimationManualDemo();
}

//需要继承TickerProvider，如果有多个AnimationController，则应该使用TickerProviderStateMixin。
class _AnimationManualDemo extends State<AnimationAutoListenDemo2>
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
    return AnimatedBuilder(
      animation: animation,
      builder: (BuildContext ctx, child) {
        final value = Tween(begin: 0.0, end: 300.0).evaluate(animation);
        return Center(
          child: Image.asset(
            "assets/images/star.webp",
            width: value,
            height: value,
          ),
        );
      },
    );
  }

  @override
  dispose() {
    //路由销毁时需要释放动画资源
    controller.dispose();
    super.dispose();
  }
}
