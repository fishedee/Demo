import 'package:flutter/material.dart';

class ContainerDemo extends StatelessWidget {
  const ContainerDemo({
    Key? key,
  }) : super(key: key);

  //Container同时组合了DecoratedBox，ConstrainedBox，Transform，Padding，Align
  Widget _buildContainerNormal() {
    return Container(
      margin: const EdgeInsets.only(top: 50.0, left: 120.0),
      constraints:
          const BoxConstraints.tightFor(width: 200.0, height: 150.0), //卡片大小
      decoration: const BoxDecoration(
        //背景装饰
        gradient: RadialGradient(
          //背景径向渐变
          colors: [Colors.red, Colors.orange],
          center: Alignment.topLeft,
          radius: .98,
        ),
        boxShadow: [
          //卡片阴影
          BoxShadow(
            color: Colors.black54,
            offset: Offset(2.0, 2.0),
            blurRadius: 4.0,
          )
        ],
      ),
      transform: Matrix4.rotationZ(.2), //卡片倾斜变换
      alignment: Alignment.center, //卡片内文字居中
      child: const Text(
        //卡片文字
        "5.20", style: TextStyle(color: Colors.white, fontSize: 40.0),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      //主轴start
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        _buildContainerNormal(),
        const SizedBox(height: 50),
        Container(
          margin: const EdgeInsets.all(20.0), //容器外补白
          color: Colors.orange,
          child: const Text("Hello world!"),
        ),
        const SizedBox(height: 50),
        Container(
          padding: const EdgeInsets.all(20.0), //容器内补白
          color: Colors.orange,
          child: const Text("Hello world!"),
        ),
      ],
    );
  }
}
