import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  final String prefixShow;

  const Counter({required this.prefixShow, super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(
          onPressed: _increment,
          child: Text('${widget.prefixShow}_Increment'),
        ),
        const SizedBox(width: 16),
        Text('Count: $_counter'),
      ],
    );
  }
}

class Message extends StatefulWidget {
  const Message({super.key});

  @override
  State<Message> createState() => _MessageState();
}

class _MessageState extends State<Message> {
  int _counter2 = 0;

  void _increment() {
    setState(() {
      _counter2++;
    });
  }

  //GlobalKey可以实现跨层级复用Widget
  final GlobalKey<_CounterState> _globalKey1 = GlobalKey();

  //GlobalKey可以实现跨层级复用Widget
  final GlobalKey<_CounterState> _globalKey2 = GlobalKey();

  @override
  Widget build(BuildContext context) {
    Widget child1 = Counter(key: _globalKey1, prefixShow: 'Count a');
    Widget child2 =
        Container(child: Counter(key: _globalKey2, prefixShow: 'Count b'));
    //在Counter上加上globalKey以后，Widget就能正常地重用了
    if (_counter2 % 2 == 1) {
      (child2, child1) = (child1, child2);
    }

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(
          onPressed: _increment,
          child: const Text('Swap Counter'),
        ),
        const SizedBox(width: 16),
        Column(children: [child1, child2]),
      ],
    );
  }
}

class BasicWidget6_2 extends StatelessWidget {
  const BasicWidget6_2({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Message();
  }
}
