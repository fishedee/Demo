import 'package:flutter/material.dart';

class TextEditFocus2 extends StatefulWidget {
  @override
  State<TextEditFocus2> createState() => _TextEditFocus2();
}

class _TextEditFocus2 extends State<TextEditFocus2> {
  FocusNode focusNode1 = FocusNode();
  FocusNode focusNode2 = FocusNode();
  final FocusScopeNode focusScopeNode = FocusScopeNode();

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
        child: FocusScope(
          node: focusScopeNode,
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
                        child: const Text("下一个焦点"),
                        onPressed: () {
                          focusScopeNode.nextFocus();
                        },
                      ),
                      ElevatedButton(
                        child: const Text("上一个焦点"),
                        onPressed: () {
                          focusScopeNode.previousFocus();
                        },
                      ),
                      ElevatedButton(
                        child: const Text("取消焦点"),
                        onPressed: () {
                          focusScopeNode.unfocus();
                        },
                      )
                    ],
                  );
                },
              ),
            ],
          ),
        ));
  }
}
