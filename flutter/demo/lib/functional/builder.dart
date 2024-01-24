import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class BuilderDemo extends StatefulWidget {
  const BuilderDemo({
    super.key,
  });

  @override
  State<BuilderDemo> createState() => _BuilderDemo();
}

class _BuilderDemo extends State<BuilderDemo> {
  @override
  Widget build(BuildContext context) {
    var counter = 0;
    return Column(
      children: [
        ElevatedButton(
          onPressed: () {
            setState(() {});
          },
          child: const Text("全页刷新"),
        ),
        Container(
          color: Colors.red,
          height: 20,
        ),
        Builder(builder: (context) {
          print('build builder');
          return const Text("123");
        }),
        Container(
          color: Colors.red,
          height: 20,
        ),
        StatefulBuilder(builder: (context, setState) {
          print('build StatefulBuilder');
          return Row(
            children: [
              Text("counter_$counter"),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    //读取的是本地build的变量，在全页刷新的时候，会丢失。
                    //需要将变量放在stateful里面的
                    counter++;
                  });
                },
                child: const Text("inc"),
              )
            ],
          );
        }),
        Container(
          color: Colors.red,
          height: 20,
        ),
        MyStatefulBuilder<MyCounter>(
          builder: (context, useDataRef) {
            print('build MyStatefulBuilder');
            var data = useDataRef(() {
              return MyCounter();
            });
            return Row(
              children: [
                Text("counter_${data.counter}"),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      data.inc();
                    });
                  },
                  child: const Text("inc"),
                )
              ],
            );
          },
        )
      ],
    );
  }
}

class MyCounter extends MyChangeNotifier {
  var counter = 0;

  void inc() {
    counter++;
    notifyListeners();
  }
}

class MyChangeNotifier implements Listenable {
  List listeners = [];
  @override
  void addListener(VoidCallback listener) {
    //添加监听器
    listeners.add(listener);
  }

  @override
  void removeListener(VoidCallback listener) {
    //移除监听器
    listeners.remove(listener);
  }

  void notifyListeners() {
    //通知所有监听器，触发监听器回调
    for (final listener in listeners) {
      listener();
    }
  }
}

typedef MyBuilderUseDataRef<T> = T Function(T Function() firstInit);

typedef MyBuilderHandler<T> = Function(
    BuildContext context, MyBuilderUseDataRef<T> useDataRef);

class MyStatefulBuilderInner<T extends MyChangeNotifier>
    extends StatefulWidget {
  const MyStatefulBuilderInner({
    super.key,
    required this.builder,
  });

  final MyBuilderHandler<T> builder;

  @override
  State<MyStatefulBuilderInner<T>> createState() => _MyBuilderInner<T>();
}

class _MyBuilderInner<T extends MyChangeNotifier>
    extends State<MyStatefulBuilderInner<T>> {
  late final T data;

  bool hasInit = false;

  Widget? cacheWidget;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    if (this.hasInit) {
      data.removeListener(refresh);
    }
  }

  refresh() {
    setState(() {});
  }

  T useDataRef(T Function() firstInit) {
    if (hasInit) {
      return data;
    }
    data = firstInit();
    data.addListener(refresh);
    hasInit = true;
    return data;
  }

  @override
  Widget build(BuildContext context) {
    return widget.builder(context, useDataRef);
  }
}

class MyStatefulBuilder<T extends MyChangeNotifier> extends StatefulWidget {
  const MyStatefulBuilder({
    super.key,
    required this.builder,
  });

  final MyBuilderHandler<T> builder;

  @override
  State<MyStatefulBuilder<T>> createState() => _MyStatefulBuilder<T>();
}

class _MyStatefulBuilder<T extends MyChangeNotifier>
    extends State<MyStatefulBuilder<T>> {
  Widget? _oldWidget;

  @override
  Widget build(BuildContext context) {
    var old = _oldWidget;
    if (old == null) {
      var newWidget = MyStatefulBuilderInner(builder: widget.builder);
      _oldWidget = newWidget;
      return newWidget;
    }
    return old;
  }
}
