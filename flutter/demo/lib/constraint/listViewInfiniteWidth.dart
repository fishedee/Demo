import 'package:flutter/material.dart';

class ListViewInfiniteWidthDemo extends StatefulWidget {
  const ListViewInfiniteWidthDemo({
    super.key,
  });

  @override
  State<ListViewInfiniteWidthDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewInfiniteWidthDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return OverflowBox(
        //RenderBox was not laid out报错，ListView需要有限的最大宽度
        maxWidth: double.infinity,
        child: ListView(
            children:
                List.generate(100, (index) => Text("Text_${index + 1}"))));
  }
}
