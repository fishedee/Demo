import 'package:flutter/material.dart';

class TextDemo extends StatelessWidget {
  const TextDemo({
    Key? key,
  }) : super(key: key);

  final TextStyle bold24Roboto = const TextStyle(
    color: Colors.red,
    fontSize: 18.0,
    fontWeight: FontWeight.bold,
  );

  // 声明文本样式
  final robotoTextStyle = const TextStyle(
    fontFamily: 'Roboto',
  );

  final robotoTextItalicStyle = const TextStyle(
    fontFamily: 'Roboto',
    fontStyle: FontStyle.italic,
  );

  final robotoTextBoldStyle = const TextStyle(
    fontFamily: 'Roboto',
    fontWeight: FontWeight.w500,
  );

  final qingKeHuangyouTextStyle = const TextStyle(
    fontFamily: 'QingKeHuangyou',
  );

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(children: [
      //文本对齐
      const Text(
        "Hello world",
        textAlign: TextAlign.left,
      ),
      //多行文本
      const Text(
        "Hello world! I'm Jack. ",
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
      //斜体，加粗，字体
      Text(
        "我是Robo字体，普通. ",
        style: robotoTextStyle,
      ),
      Text(
        "我是Robo字体，斜体. ",
        style: robotoTextItalicStyle,
      ),
      Text(
        "我是Robo字体，加粗. ",
        style: robotoTextBoldStyle,
      ),
      Text(
        "我是QingKeHuangyou字体，普通. ",
        style: qingKeHuangyouTextStyle,
      ),
      //样式
      Text(
        "Hello world",
        style: TextStyle(
            color: Colors.blue,
            fontSize: 18.0,
            //行高，是倍数，高度为fontSize*height
            height: 1.2,
            fontFamily: "Courier",
            background: Paint()..color = Colors.yellow,
            decoration: TextDecoration.underline,
            decorationStyle: TextDecorationStyle.dashed),
      ),
      //多文本组合
      RichText(
        text: TextSpan(
          style: bold24Roboto,
          children: const <TextSpan>[
            TextSpan(text: 'Lorem '),
            TextSpan(
              text: 'ipsum',
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontStyle: FontStyle.italic,
                color: Colors.green,
                fontSize: 48,
              ),
            ),
          ],
        ),
      ),
      //继承文本样式
      const DefaultTextStyle(
          //1.设置文本默认样式
          style: TextStyle(
            color: Colors.purple,
            fontSize: 20.0,
          ),
          textAlign: TextAlign.start,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text("hello world"),
              Text("I am Jack"),
              Text(
                "I am Jack",
                style: TextStyle(
                    inherit: false, //2.不继承默认样式

                    color: Colors.grey),
              ),
            ],
          )),
    ]));
  }
}
