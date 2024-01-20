import 'package:flutter/material.dart';

class TextEditFocus1 extends StatefulWidget {
  @override
  State<TextEditFocus1> createState() => _TextEditFocus1();
}

class _TextEditFocus1 extends State<TextEditFocus1> {
  FocusNode focusNode1 = FocusNode();
  FocusNode focusNode2 = FocusNode();
  FocusScopeNode? focusScopeNode;

  @override
  void initState() {
    super.initState();

    //监听焦点状态改变事件
    focusNode1.addListener(() {
      print('focusNode1 focus info: [${focusNode1.hasFocus}]');
    });

    focusNode2.addListener(() {
      print('focusNode1 focus info: [${focusNode2.hasFocus}]');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: <Widget>[
          TextField(
            autofocus: true,
            focusNode: focusNode1, //关联focusNode1
            decoration: const InputDecoration(labelText: "input1"),
          ),
          TextField(
            focusNode: focusNode2, //关联focusNode2
            decoration: const InputDecoration(labelText: "input2"),
          ),
          Builder(
            builder: (ctx) {
              return Column(
                children: <Widget>[
                  ElevatedButton(
                    child: Text("移动焦点"),
                    onPressed: () {
                      //将焦点从第一个TextField移到第二个TextField
                      // 这是一种写法 FocusScope.of(context).requestFocus(focusNode2);
                      // 这是第二种写法
                      var a = focusScopeNode ?? FocusScope.of(context);
                      focusScopeNode = a;
                      a.requestFocus(focusNode2);
                    },
                  ),
                  ElevatedButton(
                    child: Text("隐藏键盘"),
                    onPressed: () {
                      // 当所有编辑框都失去焦点时键盘就会收起
                      focusNode1.unfocus();
                      focusNode2.unfocus();
                    },
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }
}
