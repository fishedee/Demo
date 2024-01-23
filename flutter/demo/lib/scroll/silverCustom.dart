import 'dart:math';
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class SilverCustomDemo extends StatelessWidget {
  const SilverCustomDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        //我们需要实现的 SliverFlexibleHeader 组件
        MySilverToBoxAdapter(
          child: Image.asset("assets/images/star.webp"),
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

//看SilverToBoxAdapter的代码
class MySilverToBoxAdapter extends SingleChildRenderObjectWidget {
  const MySilverToBoxAdapter({
    Key? key,
    required Widget child,
  }) : super(key: key, child: child);

  @override
  RenderObject createRenderObject(BuildContext context) {
    //返回的是RenderSliver，而不是RenderBox，使用专用的 Sliver 布局协议
    return RenderMySilverToBoxAdapter();
  }
}

//关键要看RenderSliverToBoxAdapter的代码
class RenderMySilverToBoxAdapter extends RenderSliverSingleBoxAdapter {
  RenderMySilverToBoxAdapter();

  @override
  void performLayout() {
    //对child进行布局
    child!.layout(constraints.asBoxConstraints(), parentUsesSize: true);
    final double childExtent = child!.size.height;

    //可以简单地理解为max(childExtent - constraints.scrollOffset, 0)
    final double paintedChildSize =
        calculatePaintOffset2(constraints, from: 0.0, to: childExtent);

    print(
        'scrollExtent childExtent:$childExtent offset:${constraints.scrollOffset}, paintedChildSize:$paintedChildSize');
    geometry = SliverGeometry(
      //在滚动条中占有的位置
      scrollExtent: childExtent,
      paintOrigin: 0,
      //在当前viewport的paint中渲染的大小
      paintExtent: paintedChildSize,
      //在当前viewport的paint中最大占用的位置
      maxPaintExtent: childExtent,
      //在当前viewPort中的piant中占用的位置，这个不填的话，默认就是paintExtent
      layoutExtent: paintedChildSize,
    );

    //设置child的起始渲染位置
    setChildParentData2(child!, constraints, geometry!);
  }

  double calculatePaintOffset2(SliverConstraints constraints,
      {required double from, required double to}) {
    assert(from <= to);
    final double a = constraints.scrollOffset;
    final double b =
        constraints.scrollOffset + constraints.remainingPaintExtent;
    return clampDouble(clampDouble(to, a, b) - clampDouble(from, a, b), 0.0,
        constraints.remainingPaintExtent);
  }

  @protected
  void setChildParentData2(RenderObject child, SliverConstraints constraints,
      SliverGeometry geometry) {
    final SliverPhysicalParentData childParentData =
        child.parentData! as SliverPhysicalParentData;
    childParentData.paintOffset = Offset(0.0, -constraints.scrollOffset);
  }
}
