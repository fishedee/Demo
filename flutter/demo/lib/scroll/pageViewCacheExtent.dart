import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//PageView常用来实现 Tab 换页效果、图片轮动以及抖音上下滑页切换视频功能
class PageViewCacheExtentDemo extends StatelessWidget {
  const PageViewCacheExtentDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var children = <Widget>[];
    // 生成 6 个 Tab 页
    for (int i = 0; i < 6; ++i) {
      children.add(
        //使用true的话，则在ListView或者PageView等Scroll组件中，无论什么时候都会缓存，无论滑出viewport有多远。
        //需谨慎使用
        KeepAliveWrapper(
          keepAlive: true,
          child: PageViewCounter(text: 'Counter_$i'),
        ),
      );
    }

    return PageView(
      //只能缓存前后一页，超出的会丢失状态
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

class KeepAliveWrapper extends StatefulWidget {
  const KeepAliveWrapper({
    Key? key,
    this.keepAlive = true,
    required this.child,
  }) : super(key: key);
  final bool keepAlive;
  final Widget child;

  @override
  _KeepAliveWrapperState createState() => _KeepAliveWrapperState();
}

/*
* 由flutter来询问我们要不要keepAlive，混入AutomaticKeepAliveClientMixin就可以了
*/
class _KeepAliveWrapperState extends State<KeepAliveWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return widget.child;
  }

  @override
  void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
    if (oldWidget.keepAlive != widget.keepAlive) {
      // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
      updateKeepAlive();
    }
    super.didUpdateWidget(oldWidget);
  }

  //返回要不要keepAlive
  @override
  bool get wantKeepAlive => widget.keepAlive;
}
