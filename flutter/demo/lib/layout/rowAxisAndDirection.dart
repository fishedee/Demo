import 'package:flutter/material.dart';

class RowAxisAndDirectionDemo extends StatelessWidget {
  const RowAxisAndDirectionDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Column(
      //测试Row对齐方式，排除Column默认居中对齐的干扰
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(" hello world "),
            Text(" I am Jack "),
          ],
        ),
        Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(" hello world "),
            Text(" I am Jack "),
          ],
        ),
        Row(
          //mainAxisAlignment是主轴对齐方向
          mainAxisAlignment: MainAxisAlignment.end,
          //textDirection是水平方向的对齐方式，只有ltr，和rtl两种方式。一般不需要配置
          textDirection: TextDirection.rtl,
          children: <Widget>[
            Text(" hello world "),
            Text(" I am Jack "),
          ],
        ),
        Row(
          //crossAxisAlignment是交叉轴对齐方向
          crossAxisAlignment: CrossAxisAlignment.start,
          //verticalDirection是垂直方向对齐方式，有up和down，两种方式。一般不需要配置
          verticalDirection: VerticalDirection.up,
          children: <Widget>[
            Text(
              " hello world ",
              style: TextStyle(fontSize: 30.0),
            ),
            Text(" I am Jack "),
          ],
        ),
      ],
    );
  }
}
