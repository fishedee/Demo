import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  //注意，counter的props发生变化的时候，state不会丢失
  //counter设计为immutable，可以大幅简化build里面diff的效率。
  //如果diff的前后引用是相同的，例如是const类型，那这个Widget的整颗树都是肯定没变化的。这也是为什么build里面这么多const变量的原因。
  //如果Widget设计为非immutable，用户可以偷偷复用同一个Widget，只是里面的数据变更了，build里面就无法通过引用来快速筛选掉不变的Widget树。
  final String prefixShow;

  const Counter({required this.prefixShow,super.key});


  //要不要createState的根本取决于Widget的key有没有发生变化
  //没有变化的话，复用原来的State。有变化的话，需要创建新的state
  //state上面的widget引用不一定是原来的那个。
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
    //build的时候，可以使用两种变量
    //本地变量，_counter
    //state当前widget的变量，也就是widget.prefixShow。同一个state对应的widget在每次build的时候都是不同，或者相同的。
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
  final GlobalKey<_CounterState> _globalKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    Widget child ;
    if (_counter2%2 == 0){
      child = Counter(key:_globalKey,prefixShow: 'msg_$_counter2');
    }else{
      child = Padding(
        padding: const EdgeInsets.symmetric(vertical: 100),
        child:Counter(key:_globalKey,prefixShow: 'msg_$_counter2',)
      );
    }
       
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(
          onPressed: _increment,
          child: const Text('IncrementMessage'),
        ),
        const SizedBox(width: 16),
        child,
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