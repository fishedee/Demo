import 'package:flutter/material.dart';

class AnimationManualListenDemo extends StatefulWidget {
  const AnimationManualListenDemo({Key? key}) : super(key: key);

  @override
  State<AnimationManualListenDemo> createState() => _AnimationManualDemo();
}

//需要继承TickerProvider，如果有多个AnimationController，则应该使用TickerProviderStateMixin。
class _AnimationManualDemo extends State<AnimationManualListenDemo>
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

    //匀速
    //图片宽高从0变到300
    animation = Tween(begin: 0.0, end: 300.0).animate(controller)
      ..addListener(() {
        //需要手动倾听value的变化，然后进行setState
        setState(() => {});
      });

    //启动动画(正向执行)
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.asset(
        "assets/images/star.webp",
        width: animation.value,
        height: animation.value,
      ),
    );
  }

  @override
  dispose() {
    //路由销毁时需要释放动画资源
    controller.dispose();
    super.dispose();
  }
}
