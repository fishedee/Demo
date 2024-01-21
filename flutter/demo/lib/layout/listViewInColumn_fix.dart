import 'package:flutter/material.dart';

class ListViewInColumnFixDemo extends StatefulWidget {
  const ListViewInColumnFixDemo({
    super.key,
  });

  @override
  State<ListViewInColumnFixDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewInColumnFixDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // RenderBox was not laid out，报错
    //Column的child的主轴设置为Expanded的话，会变成loose约束
    return Column(children: [
      const Text("ListViewInColumnFixDemo"),
      Expanded(
          child: ListView(
              children:
                  List.generate(100, (index) => Text("Text_${index + 1}"))))
    ]);
  }
}
