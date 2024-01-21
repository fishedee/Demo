import 'package:flutter/material.dart';

class ListViewInRowDemo extends StatefulWidget {
  const ListViewInRowDemo({
    super.key,
  });

  @override
  State<ListViewInRowDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewInRowDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // RenderBox was not laid out，报错
    //Row的每个child在主轴方向默认就是Unbounded约束，导致ListView无法排版
    return Row(children: [
      const Text("ListViewInRowDemo"),
      ListView(
          children: List.generate(100, (index) => Text("Text_${index + 1}")))
    ]);
  }
}
