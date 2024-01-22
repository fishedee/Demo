import 'package:flutter/material.dart';

class StackFitDemo extends StatelessWidget {
  const StackFitDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: Stack(
        //默认放在中间
        alignment: Alignment.center,
        //没有left，没有top的占满整个空间
        fit: StackFit.expand,
        children: <Widget>[
          //left为18，加上垂直居中
          const Positioned(
            left: 18.0,
            child: Text("I am Jack"),
          ),
          //占满整个空间
          Container(
            color: Colors.red,
            child: const Text("Hello world",
                style: TextStyle(color: Colors.white)),
          ),
          //top为18，加上水平居中
          const Positioned(
            top: 18.0,
            child: Text("Your friend"),
          )
        ],
      ),
    );
  }
}
