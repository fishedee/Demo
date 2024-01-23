import 'dart:math';
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class SilverCustomDemo2 extends StatelessWidget {
  const SilverCustomDemo2({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      //为了能使CustomScrollView拉到顶部时还能继续往下拉，必须让 physics 支持弹性效果
      physics:
          const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
      slivers: [
        //我们需要实现的 SliverFlexibleHeader 组件
        SliverFlexibleHeader(
          visibleExtent: 200, // 初始状态在列表中占用的布局高度
          // 为了能根据下拉状态变化来定制显示的布局，我们通过一个 builder 来动态构建布局。
          builder: (context, availableHeight) {
            var result = GestureDetector(
              onTap: () => print('tap'), //测试是否可以响应事件
              child: Image(
                image: const AssetImage("assets/images/star.webp"),
                width: 50.0,
                height: availableHeight,
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
  double maxExtent,
  //ScrollDirection direction,
);

class SliverFlexibleHeader extends StatelessWidget {
  const SliverFlexibleHeader({
    Key? key,
    this.visibleExtent = 0,
    required this.builder,
  }) : super(key: key);

  final SliverFlexibleHeaderBuilder builder;
  final double visibleExtent;

  @override
  Widget build(BuildContext context) {
    //关键是实现_SliverFlexibleHeader
    return _SliverFlexibleHeader(
      visibleExtent: visibleExtent,
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return builder(context, constraints.maxHeight);
        },
      ),
    );
  }
}

class _SliverFlexibleHeader extends SingleChildRenderObjectWidget {
  const _SliverFlexibleHeader({
    Key? key,
    required Widget child,
    this.visibleExtent = 0,
  }) : super(key: key, child: child);
  final double visibleExtent;

  @override
  RenderObject createRenderObject(BuildContext context) {
    //返回的是RenderSliver，而不是RenderBox，使用专用的 Sliver 布局协议
    return _FlexibleHeaderRenderSliver(visibleExtent);
  }

  @override
  void updateRenderObject(
      BuildContext context, _FlexibleHeaderRenderSliver renderObject) {
    renderObject.visibleExtent = visibleExtent;
  }
}

//_FlexibleHeaderRenderSliver的目标是
//在performLayout中
//1. 获取当前的constraints
//2. 对child进行布局计算
//3. 设置本地geometry变量，以供CustomScrollView进行布局使用
class _FlexibleHeaderRenderSliver extends RenderSliverSingleBoxAdapter {
  _FlexibleHeaderRenderSliver(double visibleExtent)
      : _visibleExtent = visibleExtent;

  double _lastOverScroll = 0;
  double _lastScrollOffset = 0;
  late double _visibleExtent = 0;

  set visibleExtent(double value) {
    // 可视长度发生变化，更新状态并重新布局
    if (_visibleExtent != value) {
      _lastOverScroll = 0;
      _visibleExtent = value;
      markNeedsLayout();
    }
  }

  @override
  void performLayout() {
    // 滑动距离大于_visibleExtent时则表示子节点已经在屏幕之外了
    if (child == null || (constraints.scrollOffset > _visibleExtent)) {
      geometry = SliverGeometry(scrollExtent: _visibleExtent);
      return;
    }

    // 测试overlap,下拉过程中overlap会一直变化.
    double overScroll = constraints.overlap < 0 ? constraints.overlap.abs() : 0;
    var scrollOffset = constraints.scrollOffset;

    // 在Viewport中顶部的可视空间为该 Sliver 可绘制的最大区域。
    // 1. 如果Sliver已经滑出可视区域则 constraints.scrollOffset 会大于 _visibleExtent，
    //    这种情况我们在一开始就判断过了。
    // 2. 如果我们下拉超出了边界，此时 overScroll>0，scrollOffset 值为0，所以最终的绘制区域为
    //    _visibleExtent + overScroll.
    double paintExtent = _visibleExtent + overScroll - constraints.scrollOffset;
    // 绘制高度不超过最大可绘制空间
    //paintExtent = min(paintExtent, constraints.remainingPaintExtent);

    //对子组件进行布局，关于 layout 详细过程我们将在本书后面布局原理相关章节详细介绍，现在只需知道
    //子组件通过 LayoutBuilder可以拿到这里我们传递的约束对象（ExtraInfoBoxConstraints）
    var childConstraints = constraints.asBoxConstraints(maxExtent: paintExtent);
    //print('childConstraints $childConstraints');
    child!.layout(
      childConstraints,
      parentUsesSize: false,
    );

    //最大为_visibleExtent，最小为 0
    double layoutExtent = min(_visibleExtent, paintExtent);

    print(
        'scroll info,layoutExtent:$layoutExtent paintExtent:$paintExtent ,overScroll:$overScroll, scrollOffset:${constraints.scrollOffset} overScroll:${constraints.overlap} remainingPaintExtent:${constraints.remainingPaintExtent}');

    //设置geometry，Viewport 在布局时会用到

    geometry = SliverGeometry(
      scrollExtent: layoutExtent,
      paintOrigin: 0,
      paintExtent: paintExtent,
      maxPaintExtent: paintExtent,
      //layoutExtent: layoutExtent,
    );
  }
}
