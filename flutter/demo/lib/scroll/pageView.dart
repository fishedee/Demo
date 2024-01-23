import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//PageView常用来实现 Tab 换页效果、图片轮动以及抖音上下滑页切换视频功能
class PageViewDemo extends StatelessWidget {
  const PageViewDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var children = <Widget>[];
    // 生成 6 个 Tab 页
    for (int i = 0; i < 6; ++i) {
      children.add(PageViewCounter(text: 'Counter_$i'));
    }

    return PageView(
      //keepAlive的意义：
      //1. PageView只能缓存前后一页，超出的会丢失状态
      //2. ListView里面有一个类似的配置，addAutomaticKeepAlives，配置为true的时候，滑出viewport以后，依然会缓存widget。
      //   但是如果滑出viewPort的距离太远，依然会丢失状态
      //是否开启keepAlive:
      // 开启keepAlive能避免重复刷新页面状态，但是消耗更多的内存
      // 不开启keepAlive，切换页面需要重新刷新，状态需要移到父级来保存，否则会丢失状态。
      allowImplicitScrolling: true,
      // scrollDirection: Axis.vertical, // 滑动方向为垂直方向
      children: children,
    );
  }
}

class PageViewCounter extends StatefulWidget {
  const PageViewCounter({Key? key, required this.text}) : super(key: key);

  final String text;

  @override
  _PageViewCounter createState() => _PageViewCounter();
}

class _PageViewCounter extends State<PageViewCounter> {
  var _counter = 0;

  @override
  Widget build(BuildContext context) {
    print("build ${widget.text}");
    return Center(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Center(child: Text("${widget.text}_$_counter")),
        ElevatedButton(
            onPressed: () {
              setState(() {
                _counter++;
              });
            },
            child: const Text("递增counter"))
      ]),
    );
  }
}
