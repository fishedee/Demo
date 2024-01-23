import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SliverPersistHeaderDemo extends StatelessWidget {
  const SliverPersistHeaderDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      //sticky 的Header，最小高度为50，初始高度为80，列表下拉的时候，会缩小为高度50
      const Expanded(
          child: PersistentHeaderRoute(
              pinned: true, floating: false, minHeight: 50, maxHeight: 80)),
      Container(
        height: 10,
        color: Colors.red,
      ),
      //sticky 的Header，最小高度为50，初始高度为50，列表下拉的时候，高度不变
      const Expanded(
          child: PersistentHeaderRoute(
              pinned: true, floating: false, minHeight: 50, maxHeight: 50)),
      Container(
        height: 10,
        color: Colors.red,
      ),
      //floating 的Header，最小高度为50，初始高度为80，列表下拉的时候，Header会消失，当稍微向上的时候，Header会重新出现，直至Header完全出现以后（高度80），才能下拉body
      const Expanded(
          child: PersistentHeaderRoute(
              pinned: false, floating: true, minHeight: 50, maxHeight: 80)),
      Container(
        height: 10,
        color: Colors.red,
      ),
      //普通的滚动Header，最小高度为50，初始高度为80，列表下拉的时候，Header会消失，当稍微向上的时候，Header会重新出现
      const Expanded(
          child: PersistentHeaderRoute(
              pinned: false, floating: false, minHeight: 50, maxHeight: 80)),
    ]);
  }
}

class PersistentHeaderRoute extends StatelessWidget {
  final bool pinned;

  final bool floating;

  final double minHeight;

  final double maxHeight;

  const PersistentHeaderRoute(
      {super.key,
      required this.pinned,
      required this.floating,
      required this.minHeight,
      required this.maxHeight});

  @override
  Widget build(BuildContext context) {
    print('$pinned, $floating, $minHeight,$maxHeight');
    return CustomScrollView(
      slivers: [
        SliverPersistentHeader(
          pinned: pinned,
          floating: floating,
          delegate: SliverHeaderDelegate(
            //有最大和最小高度
            pinned: pinned,
            minHeight: minHeight,
            maxHeight: maxHeight,
            child: buildHeader(1),
          ),
        ),
        buildSliverList(),
      ],
    );
  }

  // 构建固定高度的SliverList，count为列表项属相
  Widget buildSliverList([int count = 100]) {
    return SliverFixedExtentList(
      itemExtent: 50,
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return ListTile(title: Text('$index'));
        },
        childCount: count,
      ),
    );
  }

  // 构建 header
  Widget buildHeader(int i) {
    return Container(
      color: Colors.lightBlue.shade200,
      alignment: Alignment.centerLeft,
      child: Text("PersistentHeader $i"),
    );
  }
}

typedef SliverHeaderBuilder = Widget Function(
    BuildContext context, double shrinkOffset, bool overlapsContent);

class SliverHeaderDelegate extends SliverPersistentHeaderDelegate {
  // child 为 header
  SliverHeaderDelegate({
    required this.maxHeight,
    this.minHeight = 0,
    required this.pinned,
    required Widget child,
  })  : builder = ((a, b, c) => child),
        assert(minHeight <= maxHeight && minHeight >= 0);

  final bool pinned;
  final double maxHeight;
  final double minHeight;
  final SliverHeaderBuilder builder;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    Widget child = builder(context, shrinkOffset, overlapsContent);
    //shrinkOffset为0，代表收缩程度最小，header处于最大的展开状态。
    //shrinkOffset为maxHeight，代表收缩程度最大，header处于最小的展开状态。
    //shrinkOffset读数最大为maxHeight，但是实际渲染的时候shrink只需要取maxHeight-minHeight就可以了。
    //因为body的开始渲染位置就是beginPaint = maxHeight - shrinkOffset。

    var headerExtent = maxHeight - shrinkOffset;
    var headerShowHeight = maxHeight - shrinkOffset;
    if (pinned && headerShowHeight < minHeight) {
      headerShowHeight = minHeight;
    }

    print(
        '${child.key}: shrink: $shrinkOffset，headerExtent: $headerExtent,headerHeight: $headerShowHeight, overlaps:$overlapsContent');
    // 让 header 尽可能充满限制的空间；宽度为 Viewport 宽度，
    // 高度随着用户滑动在[minHeight,maxHeight]之间变化。
    return SizedBox.expand(child: child);
  }

  @override
  double get maxExtent => maxHeight;

  @override
  double get minExtent => minHeight;

  @override
  bool shouldRebuild(SliverHeaderDelegate oldDelegate) {
    return oldDelegate.maxExtent != maxExtent ||
        oldDelegate.minExtent != minExtent;
  }
}
