import 'package:demo/scroll/pageViewCacheExtent.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class TabBarViewDemo extends StatefulWidget {
  const TabBarViewDemo({
    Key? key,
  }) : super(key: key);

  @override
  _TabViewRoute1State createState() => _TabViewRoute1State();
}

//TabBarView其实就是PageView和TabBar的组合使用而已
class _TabViewRoute1State extends State<TabBarViewDemo>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List tabs = ["新闻", "历史", "图片"];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("App Name"),
        bottom: TabBar(
          //这里绑定同一个_tabController
          controller: _tabController,
          tabs: tabs.map((e) => Tab(text: e)).toList(),
        ),
      ),
      body: TabBarView(
        //这里绑定同一个_tabController
        controller: _tabController,
        children: tabs.map((e) {
          return KeepAliveWrapper(
            child: Container(
              alignment: Alignment.center,
              child: Text(e, textScaleFactor: 5),
            ),
          );
        }).toList(),
      ),
    );
  }

  @override
  void dispose() {
    // 释放资源
    _tabController.dispose();
    super.dispose();
  }
}
