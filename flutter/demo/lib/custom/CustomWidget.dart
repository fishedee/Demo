import 'package:flutter/material.dart';

class CustomWidgetDemo extends StatelessWidget {
  const CustomWidgetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    var curText = "cc";
    return StatefulBuilder(builder: (context, setState) {
      return Column(children: [
        MyRichText(
          text: curText,
          linkStyle: const TextStyle(fontSize: 15),
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              curText += "\ndd";
            });
          },
          child: const Text("点我"),
        )
      ]);
    });
  }
}

class MyRichText extends StatefulWidget {
  const MyRichText({
    super.key,
    required this.text, // 文本字符串
    required this.linkStyle, // url链接样式
  });

  final String text;
  final TextStyle linkStyle;

  @override
  State<MyRichText> createState() => _MyRichTextState();
}

class _MyRichTextState extends State<MyRichText> {
  TextSpan _textSpan = const TextSpan(children: []);

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: _textSpan,
    );
  }

  void parseText(String text) {
    // 耗时操作：解析文本字符串，构建出TextSpan。
    // 省略具体实现。
    final textList = widget.text.split("\n");
    List<TextSpan> list = [];
    for (int i = 0; i < textList.length; i++) {
      String newText = textList[i];
      if (i != textList.length - 1) {
        newText += '\n';
      }
      list.add(TextSpan(
        text: newText,
        style: i % 2 == 0
            ? const TextStyle(color: Colors.red)
            : const TextStyle(color: Colors.blue),
      ));
    }
    _textSpan = TextSpan(
      style: widget.linkStyle,
      children: list,
    );
  }

  @override
  void initState() {
    parseText(widget.text);
    super.initState();
  }

  //当用新widget去配置旧widget的时候，就会触发该方法
  @override
  void didUpdateWidget(MyRichText oldWidget) {
    if (widget.text != oldWidget.text) {
      parseText(widget.text);
    }
    super.didUpdateWidget(oldWidget);
  }
}
