import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
        theme: ThemeData(useMaterial3: false),
        home: const Scaffold(
          body: ButtonDemo(),
        )),
  );
}

class ButtonDemo extends StatelessWidget {
  const ButtonDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(children: [
      //漂浮"按钮，它默认带有阴影和灰色背景。按
      ElevatedButton(
        child: const Text("normal"),
        onPressed: () {},
      ),
      //文本按钮
      TextButton(
        child: const Text("normal"),
        onPressed: () {},
      ),
      //普通边框按钮
      OutlinedButton(
        child: const Text("normal"),
        onPressed: () {},
      ),
      //带图标按钮
      IconButton(
        icon: const Icon(Icons.thumb_up),
        onPressed: () {},
      ),
      //图片与文字按钮
      ElevatedButton.icon(
        icon: const Icon(Icons.send),
        label: const Text("发送"),
        onPressed: () {},
      ),
      OutlinedButton.icon(
        icon: const Icon(Icons.add),
        label: const Text("添加"),
        onPressed: () {},
      ),
      TextButton.icon(
        icon: const Icon(Icons.info),
        label: const Text("详情"),
        onPressed: () {},
      ),
    ]));
  }
}
