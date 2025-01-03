import 'package:flutter/material.dart';

class StackNormalDemo extends StatelessWidget {
  const StackNormalDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: Stack(
        //默认在放在center的位置
        alignment: Alignment.center, //指定未定位或部分定位widget的对齐方式
        children: <Widget>[
          Container(
            //都在center
            color: Colors.red,
            child: const Text("Hello world",
                style: TextStyle(color: Colors.white)),
          ),
          const Positioned(
            //left为18，加上垂直居中
            left: 18.0,
            child: Text("I am Jack"),
          ),
          const Positioned(
            //top为18，加上水平居中
            top: 18.0,
            child: Text("Your friend"),
          )
        ],
      ),
    );
  }
}
