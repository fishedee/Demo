import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//ListView，GridView，PageView，AnimatedList其实底层都是用CustomScrollView + Silver来实现。
//我们可以直接用CustomScrollView + 多个silver一起做，实现多个滚动组件共用一个viewport和scrollable。
class SilverDemo extends StatelessWidget {
  const SilverDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: <Widget>[
        // AppBar，包含一个导航栏.
        SliverAppBar(
          pinned: true, // 滑动到顶端时会固定住
          expandedHeight: 250.0,
          flexibleSpace: FlexibleSpaceBar(
            title: const Text('Demo'),
            background: Image.asset(
              "assets/images/star.webp",
              fit: BoxFit.cover,
            ),
          ),
        ),
        //SilverPadding下面依然需要用silver
        SliverPadding(
          padding: const EdgeInsets.all(8.0),
          sliver: SliverGrid(
            //Grid
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2, //Grid按两列显示
              mainAxisSpacing: 10.0,
              crossAxisSpacing: 10.0,
              childAspectRatio: 4.0,
            ),
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                //创建子widget
                return Container(
                  alignment: Alignment.center,
                  color: Colors.cyan[100 * (index % 9)],
                  child: Text('grid item $index'),
                );
              },
              childCount: 20,
            ),
          ),
        ),
        //DecorateSilverList下面依然需要用silver
        DecoratedSliver(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            boxShadow: const [
              BoxShadow(
                  color: Color(0xFF111133),
                  blurRadius: 2,
                  offset: Offset(-2, -1))
            ],
            gradient: const LinearGradient(
              colors: <Color>[
                Color(0xFFEEEEEE),
                Color(0xFF111133),
              ],
              stops: <double>[0.1, 1.0],
            ),
          ),
          sliver: SliverGrid(
            //Grid
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2, //Grid按两列显示
              mainAxisSpacing: 10.0,
              crossAxisSpacing: 10.0,
              childAspectRatio: 4.0,
            ),
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                //创建子widget
                return Container(
                  alignment: Alignment.center,
                  color: Colors.cyan[100 * (index % 9)],
                  child: Text('grid item $index'),
                );
              },
              childCount: 20,
            ),
          ),
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (BuildContext context, int index) {
              //创建列表项
              return Container(
                alignment: Alignment.center,
                color: Colors.lightBlue[100 * (index % 9)],
                child: Text('list item $index'),
              );
            },
            childCount: 20,
          ),
        ),

        SliverToBoxAdapter(
          //可以嵌套一个不同轴方向的滚动控件，例如是水平方向的ListView,GridView,PageView
          //如果是嵌套相同轴方向的滚动控件，要么是使用silver组件，要么是使用renderBox组件，父组件用NestedScrollView
          child: SizedBox(
            height: 300,
            child: PageView(
              children: const [Text("1"), Text("2")],
            ),
          ),
        ),
        SliverToBoxAdapter(
          //可以嵌套任意非silver组件。
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 30),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.red, width: 1),
              color: Colors.yellow,
            ),
            child: const Text("Hello World"),
          ),
        ),
      ],
    );
  }
}
