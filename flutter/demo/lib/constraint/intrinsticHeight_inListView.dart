import 'package:flutter/material.dart';

class IntrinsticInListViewDemo extends StatelessWidget {
  const IntrinsticInListViewDemo({super.key});

  @override
  Widget build(BuildContext context) {
    const items = 4;

    //Column下面有Spacer，或者Expanded的话，需要的是一个非无穷的maxHeight，所以有IntrinsicHeight
    //当items数目较少的时候，这些items可以均分屏幕的空间。
    return LayoutBuilder(builder: (context, constraints) {
      return SingleChildScrollView(
        child: const IntrinsicHeight(
          child: Column(
            children: [
              ItemWidget(text: 'Item 1'),
              Spacer(),
              ItemWidget(text: 'Item 2'),
              Expanded(
                child: ItemWidget(text: 'Item 3'),
              ),
            ],
          ),
        ),
      );
    });
    //Column下面有spaceBetween的话，需要的是一个非0的minHeight。
    //当items数目较少的时候，这些items可以均分屏幕的空间。
    /*
    return LayoutBuilder(builder: (context, constraints) {
      return SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(minHeight: constraints.maxHeight),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: List.generate(
                items, (index) => ItemWidget(text: 'Item $index')),
          ),
        ),
      );
    });
    */
  }
}

class ItemWidget extends StatelessWidget {
  const ItemWidget({
    super.key,
    required this.text,
  });

  final String text;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: SizedBox(
        height: 100,
        child: Center(child: Text(text)),
      ),
    );
  }
}
