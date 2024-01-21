import 'package:flutter/material.dart';

class ListViewInRowFixDemo extends StatefulWidget {
  const ListViewInRowFixDemo({
    super.key,
  });

  @override
  State<ListViewInRowFixDemo> createState() => _HomePageState();
}

class _HomePageState extends State<ListViewInRowFixDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      const Text("ListViewInRowFixDemo"),
      Expanded(
          child: ListView(
              children:
                  List.generate(100, (index) => Text("Text_${index + 1}"))))
    ]);
  }
}
