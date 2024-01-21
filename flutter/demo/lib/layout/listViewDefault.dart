import 'package:flutter/material.dart';

class ListViewDefaultDemo extends StatefulWidget {
  const ListViewDefaultDemo({
    super.key,
  });

  @override
  State<ListViewDefaultDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewDefaultDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
        children: List.generate(100, (index) => Text("Text_${index + 1}")));
  }
}
