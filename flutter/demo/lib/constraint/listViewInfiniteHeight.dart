import 'package:flutter/material.dart';

class ListViewInfiniteHeightDemo extends StatefulWidget {
  const ListViewInfiniteHeightDemo({
    super.key,
  });

  @override
  State<ListViewInfiniteHeightDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewInfiniteHeightDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return OverflowBox(
        //RenderBox was not laid out报错，ListView需要有限的最大高度
        maxHeight: double.infinity,
        child: ListView(
            children:
                List.generate(100, (index) => Text("Text_${index + 1}"))));
  }
}
