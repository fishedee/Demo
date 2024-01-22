import 'package:flutter/material.dart';

class FittedBoxDemo extends StatelessWidget {
  const FittedBoxDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          //不缩放
          wContainer(BoxFit.none),
          const Text('Wendux'),
          //FittedBox的默认值为container，将子组件缩放到和父组件一样的大小
          wContainer(BoxFit.contain),
          const Text('Flutter中国'),
        ],
      ),
    );
  }

  Widget wContainer(BoxFit boxFit) {
    return Container(
      width: 50,
      height: 50,
      color: Colors.red,
      child: FittedBox(
        fit: boxFit,
        // 子容器超过父容器大小
        child: Container(width: 60, height: 70, color: Colors.blue),
      ),
    );
  }
}
