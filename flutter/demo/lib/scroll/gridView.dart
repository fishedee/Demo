import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class GridViewDemo extends StatelessWidget {
  const GridViewDemo({
    Key? key,
  }) : super(key: key);

  Widget _buildGridViewFixCrossAxis() {
    return GridView(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3, //横轴三个子widget
          //宽高比是固定的，默认就是1
          //childAspectRatio: 1.0 //宽高比为1时，子widget
        ),
        children: <Widget>[
          Image.asset('assets/images/vertical1.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical2.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical3.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical4.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical5.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical6.webp', fit: BoxFit.contain),
        ]);
  }

  Widget _buildGridViewMaxExtentntCrossAxis() {
    return GridView(
        gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 120, //横轴最宽120
          //宽高比是固定的，默认就是1
          //childAspectRatio: 1.0 //宽高比为1时，子widget
        ),
        children: <Widget>[
          Image.asset('assets/images/vertical1.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical2.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical3.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical4.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical5.webp', fit: BoxFit.contain),
          Image.asset('assets/images/vertical6.webp', fit: BoxFit.contain),
        ]);
  }

  @override
  Widget build(BuildContext context) {
    //如果单个页面有两个Scrollable的话，需要保证只有一个Scrollable的primary设置为true
    //这样才能保证都显示滚动条
    return Column(
      children: [
        Expanded(child: _buildGridViewFixCrossAxis()),
        Container(
          height: 30,
          color: Colors.red,
        ),
        Expanded(child: _buildGridViewMaxExtentntCrossAxis()),
      ],
    );
  }
}
