import 'package:flutter/material.dart';

class IntrinsticHeightExpanedDemo extends StatefulWidget {
  const IntrinsticHeightExpanedDemo({
    super.key,
  });

  @override
  State<IntrinsticHeightExpanedDemo> createState() => _HomePageState();
}

class _HomePageState extends State<IntrinsticHeightExpanedDemo> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox.expand(
        child: SingleChildScrollView(
            child: Column(
                children: list.map((e) {
      final index = list.indexOf(e);
      return _lineItems(e, index);
    }).toList())));
  }

  List list = [
    {
      'title': '这种情况下Container的宽高铺满，我们给他套上IntrinsicWidth，不设置宽/高步长',
      'content': 'IntrinsticHeightExpanedDemo'
    },
    {
      'title': '这种情况下Container的宽高铺满，我们给他套上IntrinsicWidth，不设置宽/高步长',
      'content': '可以讲子控件的高度调整至实'
    },
    {
      'title': 'IntrinsicHeight',
      'content': '可以讲子控件的高度调整至实际高度。下面这个例子如果不使用IntrinsicHeight的情况下，'
    },
    {
      'title': 'IntrinsicHeight',
      'content':
          '可以讲子控件的高度调整至实际高度。下面这个例子如果不使用IntrinsicHeight的情况下，第一个Container将会撑满整个body的高度，但使用了IntrinsicHeight高度会约束在50。这里Row的高度时需要有子内容的最大高度来决定的，但是第一个Container本身没有高度，有没有子控件，那么他就会去撑满父控件，然后发现父控件Row也是不具有自己的高度的，就撑满了body的高度。IntrinsicHeight就起到了约束Row实际高度的作用'
    },
    {
      'title': '可以发现Container宽度被压缩到50，但是高度没有变化。我们再设置宽度步长为11',
      'content': '这里设置步长会影响到子控件最后大小'
    },
    {
      'title': '可以发现Container宽度被压缩到50，但是高度没有变化。我们再设置宽度步长为11',
      'content': '这里设置步长会影响到子控件最后大小'
    }
  ];

  Widget _lineItems(res, index) {
    var isBottom = (index == list.length - 1);
    return Container(
        decoration: const BoxDecoration(
            // color: Colors.cyan,
            border: Border(bottom: BorderSide(color: Colors.grey, width: 1))),
        padding: const EdgeInsets.only(left: 15),
        margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
        child: Row(
          children: <Widget>[
            Column(children: [
              Container(
                width: 16,
                height: 16,
                decoration: BoxDecoration(
                    color: Colors.red, borderRadius: BorderRadius.circular(8)),
              ),
              //提示报错，RenderBox was not laid
              //我们将该组件的Column设置为Expanded，也报错了，Column的高度约束为无限，它无法计算Expanded是多少
              Expanded(
                  child: Container(
                width: 5,
                color: isBottom ? Colors.transparent : Colors.blue,
              )),
            ]),
            Expanded(
              child: rightWidget(res),
            ),
          ],
        ));
  }

  Widget rightWidget(res) {
    return Container(
      // color: Colors.blue,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 15),
          Text(
            res['title'],
            style: const TextStyle(
                color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold),
          ),
          Text(
            res['content'],
            style: const TextStyle(color: Colors.orange, fontSize: 15),
          ),
          const SizedBox(height: 15),
        ],
      ),
    );
  }
}
