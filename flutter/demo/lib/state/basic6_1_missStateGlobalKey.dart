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
    Widget child2 = Container(
        child: const Counter(key: ValueKey("b"), prefixShow: 'Count b'));
    //在Counter上加上localKey以后，Swap依然不能正确取得Counter的state。
    //因为无法跨层级取到原来对应的Widget
    //切换以后，每次Counter b总是重置
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

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Message(),
        ),
      ),
    ),
  );
}
