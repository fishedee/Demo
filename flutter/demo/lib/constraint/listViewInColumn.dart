import 'package:flutter/material.dart';

class ListViewInColumnDemo extends StatefulWidget {
  const ListViewInColumnDemo({
    super.key,
  });

  @override
  State<ListViewInColumnDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewInColumnDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // RenderBox was not laid out，报错
    //Column的每个child在主轴方向默认就是Unbounded约束，导致ListView无法排版
    return Column(children: [
      const Text("ListViewInColumnDemo"),
      ListView(
          children: List.generate(100, (index) => Text("Text_${index + 1}")))
    ]);
  }
}
