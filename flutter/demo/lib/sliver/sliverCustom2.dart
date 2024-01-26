import 'dart:math';
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class SliverCustomDemo2 extends StatelessWidget {
  const SliverCustomDemo2({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      //为了能使CustomScrollView拉到顶部时还能继续往下拉，必须让 physics 支持弹性效果
      physics: const BouncingScrollPhysics(),
      slivers: [
        //我们需要实现的 SliverFlexibleHeader 组件
        SliverFlexibleHeader(
          visibleExtent: 200, // 初始状态在列表中占用的布局高度
          // 为了能根据下拉状态变化来定制显示的布局，我们通过一个 builder 来动态构建布局。
          builder: (context) {
            var result = GestureDetector(
              onTap: () => print('tap'), //测试是否可以响应事件
              child: const Image(
                image: AssetImage("assets/images/star.webp"),
                alignment: Alignment.bottomCenter,
                fit: BoxFit.cover,
              ),
            );
            return result;
          },
        ),
        // 构建一个list
        buildSliverList(30),
      ],
    );
  }

  // 构建固定高度的SliverList，count为列表项属相
  Widget buildSliverList(int count) {
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
}

typedef SliverFlexibleHeaderBuilder = Widget Function(
  BuildContext context,
  //ScrollDirection direction,
);

class SliverFlexibleHeader extends StatelessWidget {
  const SliverFlexibleHeader({
    Key? key,
    required this.builder,
    required this.visibleExtent,
  }) : super(key: key);

  final double visibleExtent;

  final SliverFlexibleHeaderBuilder builder;

  @override
  Widget build(BuildContext context) {
    //关键是实现_SliverFlexibleHeader
    return _SliverFlexibleHeader(
      visibleExtent: visibleExtent,
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return builder(context);
        },
      ),
    );
  }
}

class _SliverFlexibleHeader extends SingleChildRenderObjectWidget {
  _SliverFlexibleHeader({
    Key? key,
    required Widget child,
    required this.visibleExtent,
  }) : super(key: key, child: child);

  double visibleExtent;

  @override
  RenderObject createRenderObject(BuildContext context) {
    //返回的是RenderSliver，而不是RenderBox，使用专用的 Sliver 布局协议
    return _FlexibleHeaderRenderSliver(visibleExtent);
  }
}

//_FlexibleHeaderRenderSliver的目标是
//在performLayout中
//1. 获取当前的constraints
//2. 对child进行布局计算
//3. 设置本地geometry变量，以供CustomScrollView进行布局使用
class _FlexibleHeaderRenderSliver extends RenderSliverSingleBoxAdapter {
  _FlexibleHeaderRenderSliver(this.visibleExtent);

  double visibleExtent;

  @override
  void performLayout() {
    //对child进行布局
    child!.layout(constraints.asBoxConstraints(), parentUsesSize: true);
    final double childExtent = child!.size.height;
    double offsetAdd = constraints.overlap < 0 ? constraints.overlap.abs() : 0;

    var offsetFixedSub = childExtent - visibleExtent;

    //可以简单地理解为max(visibleExtent - constraints.scrollOffset, 0)
    final double paintedChildSize =
        calculatePaintOffset(constraints, from: 0.0, to: visibleExtent);

    print(
        'scrollExtent childExtent:$childExtent offset:${constraints.scrollOffset}, paintedChildSize:${paintedChildSize + offsetAdd}');

    geometry = SliverGeometry(
      //在滚动条中占有的位置
      scrollExtent: visibleExtent,
      //paintOrigin，负数的话，代表从可见viewPort往上偏移开始渲染
      paintOrigin: -offsetFixedSub,
      //在当前可见viewport的paint中渲染的大小
      paintExtent: paintedChildSize + offsetAdd,
      //在当前可见viewport的paint中最大占用的位置
      maxPaintExtent: paintedChildSize + offsetAdd,
    );

    //设置child的起始渲染位置
    final newChild = child!.parentData!;
    final SliverPhysicalParentData childParentData =
        newChild as SliverPhysicalParentData;
    childParentData.paintOffset =
        Offset(0.0, -constraints.scrollOffset + offsetAdd);
  }
}
