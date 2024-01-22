import 'package:flutter/material.dart';

class ClipDemo extends StatelessWidget {
  const ClipDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 头像
    Widget avatar = Image.asset("assets/images/infinite_star.webp",
        width: 60.0, fit: BoxFit.cover);
    return Center(
      child: Column(
        children: <Widget>[
          avatar, //不剪裁
          ClipOval(child: avatar), //剪裁为圆形
          ClipRRect(
            //剪裁为圆角矩形
            borderRadius: BorderRadius.circular(5.0),
            child: avatar,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Align(
                //align宽度设置为0.5，导致Align父组件更小，avatar更大。
                alignment: Alignment.topLeft,
                widthFactor: .5,
                child: avatar,
              ),
              const Text(
                "你好世界",
                style: TextStyle(color: Colors.green),
              )
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ClipRect(
                //将溢出部分剪裁
                child: Align(
                  alignment: Alignment.topLeft,
                  widthFactor: .5, //宽度设为原来宽度一半
                  child: avatar,
                ),
              ),
              const Text("你好世界", style: TextStyle(color: Colors.green))
            ],
          ),
        ],
      ),
    );
  }
}
