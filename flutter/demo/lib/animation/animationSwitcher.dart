import 'package:flutter/material.dart';

class AnimationSwitcherDemo extends StatefulWidget {
  const AnimationSwitcherDemo({super.key});
  @override
  State<AnimationSwitcherDemo> createState() =>
      _AnimatedSwitcherCounterRouteState();
}

class _AnimatedSwitcherCounterRouteState extends State<AnimationSwitcherDemo> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 500),
            transitionBuilder: (Widget child, Animation<double> animation) {
              //执行缩放动画
              return ScaleTransition(child: child, scale: animation);
            },
            child: Text(
              '$_count',
              //显示指定key，不同的key会被认为是不同的Text，这样才能执行动画
              key: ValueKey<int>(_count),
              style: Theme.of(context).textTheme.headline4,
            ),
          ),
          ElevatedButton(
            child: const Text(
              '+1',
            ),
            onPressed: () {
              setState(() {
                _count += 1;
              });
            },
          ),
        ],
      ),
    );
  }
}
