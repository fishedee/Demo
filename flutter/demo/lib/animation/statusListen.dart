//https://github.com/flutter/website/tree/main/examples/animation/animate5
//看这里
//controller定义了关联多个动画，screen sync同步，以及同步启动和关闭，持续的时间。启动以后，输入当前时间，计算出当前动画的百分比。
//animation定义了数值的变化方式，描述了0和1之间的插值方式。常见有直线插值，还有曲线插值。输入当前动画的百分比，输出0和1之间的插值。
//tween，定义了实际数值的起始和结束值。输入0和1之间的插值，以及起始和结束值，输出当前值。
//组件工具
//AnimatedWidget，StatelessWidget的一个子类，自动对animation绑定listen，并且dipose
//AnimationBuilder，以声明的方式，绑定animation，并且创建一个dom包围子类，来间接控制子dom的大小或位置。
// ignore_for_file: unused_local_variable
// #docregion ShakeCurve
import 'dart:math';

// #enddocregion ShakeCurve
import 'package:flutter/material.dart';

// #docregion diff
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
      : super(listenable: animation);

  // Make the Tweens static because they don't change.
  static final _opacityTween = Tween<double>(begin: 0.1, end: 1);
  static final _sizeTween = Tween<double>(begin: 0, end: 300);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          height: _sizeTween.evaluate(animation),
          width: _sizeTween.evaluate(animation),
          child: const FlutterLogo(),
        ),
      ),
    );
  }
}

class AnimationStatusListenDemo extends StatefulWidget {
  const AnimationStatusListenDemo({super.key});

  @override
  State<AnimationStatusListenDemo> createState() => _LogoAppState();
}

class _LogoAppState extends State<AnimationStatusListenDemo>
    with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    // #docregion AnimationController, tweens
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    // #enddocregion AnimationController, tweens
    animation = CurvedAnimation(parent: controller, curve: Curves.easeIn)
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          controller.reverse();
        } else if (status == AnimationStatus.dismissed) {
          controller.forward();
        }
      });
    controller.forward();
  }

  @override
  Widget build(BuildContext context) => AnimatedLogo(animation: animation);

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
