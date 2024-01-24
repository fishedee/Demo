// 一个通用的InheritedWidget，保存需要跨组件共享的状态
import 'dart:collection';

import 'package:flutter/material.dart';

//相当于react里面的context
//可以跨组件进行获取数据，常用于主题数据的获取
class InheritedProvider<T> extends InheritedWidget {
  const InheritedProvider({
    super.key,
    required this.data,
    required Widget child,
  }) : super(child: child);

  final T data;

  @override
  bool updateShouldNotify(InheritedProvider<T> old) {
    //在此简单返回true，则每次更新都会调用依赖其的子孙节点的`didChangeDependencies`。
    return true;
  }
}

class ChangeNotifier implements Listenable {
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

//是一个Widget，包装了对ChangeNotifier的addListen和removeListen.
class ShareDataProvider<T extends ChangeNotifier> extends StatefulWidget {
  const ShareDataProvider({
    super.key,
    required this.data,
    required this.child,
  });

  final Widget child;
  final T data;

  //定义一个便捷方法，方便子树中的widget获取共享数据
  static T get<T>(BuildContext context) {
    final provider =
        context.getElementForInheritedWidgetOfExactType<InheritedProvider<T>>();
    return (provider!.widget as InheritedProvider<T>).data;
  }

  //定义一个便捷方法，方便子树和侦听中的widget中的共享数据
  static T listen<T>(BuildContext context) {
    final provider =
        context.dependOnInheritedWidgetOfExactType<InheritedProvider<T>>();
    return provider!.data;
  }

  @override
  State<ShareDataProvider<T>> createState() => _ShareDataProvider<T>();
}

class _ShareDataProvider<T extends ChangeNotifier>
    extends State<ShareDataProvider<T>> {
  void update() {
    //如果数据发生变化（model类调用了notifyListeners），重新构建InheritedProvider
    setState(() => {});
  }

  @override
  void didUpdateWidget(ShareDataProvider<T> oldWidget) {
    //当Provider更新时，如果新旧数据不"=="，则解绑旧数据监听，同时添加新数据监听
    if (widget.data != oldWidget.data) {
      oldWidget.data.removeListener(update);
      widget.data.addListener(update);
    }
    super.didUpdateWidget(oldWidget);
  }

  @override
  void initState() {
    // 给model添加监听器
    widget.data.addListener(update);
    super.initState();
  }

  @override
  void dispose() {
    // 移除model的监听器
    widget.data.removeListener(update);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    //注意，这里使用了缓存的child，只要parent不刷新，那么就会一直使用旧的widget
    return InheritedProvider<T>(
      data: widget.data,
      child: widget.child,
    );
  }
}

class Consumer<T> extends StatelessWidget {
  const Consumer({
    super.key,
    required this.builder,
  });

  final Widget Function(BuildContext context, T value) builder;

  @override
  Widget build(BuildContext context) {
    return builder(
      context,
      ShareDataProvider.listen<T>(context),
    );
  }
}

class Item {
  Item(this.price, this.count);
  double price; //商品单价
  int count; // 商品份数
}

class CartModel extends ChangeNotifier {
  // 用于保存购物车中商品列表
  final List<Item> _items = [];

  // 禁止改变购物车里的商品信息
  UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

  // 购物车中商品的总价
  double get totalPrice =>
      _items.fold(0, (value, item) => value + item.count * item.price);

  // 将 [item] 添加到购物车。这是唯一一种能从外部改变购物车的方法。
  void add(Item item) {
    _items.add(item);
    // 通知监听器（订阅者），重新构建InheritedProvider， 更新状态。
    notifyListeners();
  }
}

class ProviderDemo extends StatefulWidget {
  const ProviderDemo({
    super.key,
  });

  @override
  State<ProviderDemo> createState() => _ProviderDemo();
}

//这个唯一的性能缺陷是，从根部开始刷新的话，还是会可能出现多余的build
class _ProviderDemo extends State<ProviderDemo> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ShareDataProvider<CartModel>(
        data: CartModel(),
        child: Builder(builder: (context) {
          return Column(
            children: <Widget>[
              Consumer<CartModel>(builder: (context, cart) {
                print("Text build");
                return Text("总价: ${cart.totalPrice}");
              }),
              Builder(builder: (context) {
                print("ElevatedButton build");
                return ElevatedButton(
                  child: const Text("添加商品"),
                  onPressed: () {
                    //给购物车中添加商品，添加后总价会更新
                    ShareDataProvider.get<CartModel>(context)
                        .add(Item(20.0, 1));
                  },
                );
              }),
            ],
          );
        }),
      ),
    );
  }
}
