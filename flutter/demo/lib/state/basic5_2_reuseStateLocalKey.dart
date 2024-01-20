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

  @override
  Widget build(BuildContext context) {
    Widget child1 = const Counter(key: ValueKey("a"), prefixShow: 'Count a');
    Widget child2 = const Counter(key: ValueKey("b"), prefixShow: 'Count b');
    //在Counter上加上key以后，Swap就能正确对应到原来Counter的state上了
    //Swap Counter发现label变了，且state变了
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

class BasicWidget5_2 extends StatelessWidget {
  const BasicWidget5_2({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Message();
  }
}
