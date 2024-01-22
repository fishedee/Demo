import 'package:flutter/material.dart';

//使用LayoutBuilder来做响应式布局。
//LayoutBuilder可以在运行时获取constraint，根据不同的constraint来做布局
class ResponsiveColumn extends StatelessWidget {
  const ResponsiveColumn({Key? key, required this.children}) : super(key: key);

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    // 通过 LayoutBuilder 拿到父组件传递的约束，然后判断 maxWidth 是否小于200
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        if (constraints.maxWidth < 200) {
          // 最大宽度小于200，显示单列
          return Column(mainAxisSize: MainAxisSize.min, children: children);
        } else {
          // 大于200，显示双列
          var widgetChildren = <Widget>[];
          for (var i = 0; i < children.length; i += 2) {
            if (i + 1 < children.length) {
              widgetChildren.add(Row(
                mainAxisSize: MainAxisSize.min,
                children: [children[i], children[i + 1]],
              ));
            } else {
              widgetChildren.add(children[i]);
            }
          }
          return Column(
              mainAxisSize: MainAxisSize.min, children: widgetChildren);
        }
      },
    );
  }
}

//LayoutBuilder也可以用作运行时的布局调试
class LayoutLogPrint extends StatelessWidget {
  const LayoutLogPrint({
    Key? key,
    required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (_, constraints) {
      // assert在编译release版本时会被去除
      assert(() {
        print('${key ?? child}: $constraints');
        return true;
      }());
      return child;
    });
  }
}

class LayoutBuilderDemo extends StatelessWidget {
  const LayoutBuilderDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: Column(
        children: [
          Container(
              color: Colors.blue,
              child: const ResponsiveColumn(children: [
                Text("Fish "),
                Text("HelloWorld"),
              ])),
          const SizedBox(height: 20),
          SizedBox(
            width: 180,
            height: 180,
            child: Container(
                color: Colors.green,
                child: const ResponsiveColumn(children: [
                  Text("Fish "),
                  Text("HelloWorld"),
                ])),
          ),
          const SizedBox(height: 20),
          Container(
              color: Colors.yellow,
              child: const LayoutLogPrint(child: Text("uu")))
        ],
      ),
    );
  }
}
