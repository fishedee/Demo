import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SliverRefreshControlDemo extends StatefulWidget {
  const SliverRefreshControlDemo({
    Key? key,
  }) : super(key: key);

  @override
  State<SliverRefreshControlDemo> createState() => _SilverRefreshControlDemo();
}

class _SilverRefreshControlDemo extends State<SliverRefreshControlDemo> {
  ScrollController _scrollController = new ScrollController();

  var count = 30;

  var isRefreshing = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels + 20 >=
          _scrollController.position.maxScrollExtent) {
        _getMoreData();
      }
    });
  }

  _getMoreData() async {
    if (isRefreshing) {
      return;
    }
    isRefreshing = true;
    print('getMoreData');
    //模拟网络请求
    await Future.delayed(const Duration(milliseconds: 1000));
    setState(() {
      count += 30;
    });
    isRefreshing = false;
  }

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      physics: const BouncingScrollPhysics(),
      controller: _scrollController,
      slivers: [
        //下拉刷新组件
        CupertinoSliverRefreshControl(
          /// 刷新过程中悬浮高度
          refreshIndicatorExtent: 60,

          ///触发刷新的距离
          refreshTriggerPullDistance: 100,

          /// 自定义布局
          builder: (context, buildRefreshindictor, pulledExtent,
              refreshTriggerPullDistance, refreshIndicatorExtent) {
            final text = switch (buildRefreshindictor) {
              RefreshIndicatorMode.armed => '松开刷新',
              RefreshIndicatorMode.refresh => '正在刷新',
              RefreshIndicatorMode.drag => '下拉刷新',
              RefreshIndicatorMode.inactive => '未开始',
              RefreshIndicatorMode.done => '刷新完成',
            };
            print(
                'pulledExtent : ${pulledExtent}   ,refreshTriggerPullDistance  : ${refreshTriggerPullDistance}    refreshIndicatorExtent:${refreshIndicatorExtent} $buildRefreshindictor');
            return Container(
              color: Colors.redAccent,
              height: 150,
              alignment: Alignment.center,
              child: AnimatedOpacity(
                  duration: const Duration(milliseconds: 300),
                  //opacity: top == 80.0 ? 1.0 : 0.0,
                  opacity: 1.0,
                  child: Text(
                    '已拉动:${pulledExtent.round()} $text',
                    style: const TextStyle(fontSize: 12.0),
                  )),
            );
          },
          //下拉刷新回调
          onRefresh: () async {
            //模拟网络请求
            await Future.delayed(const Duration(milliseconds: 1000));
            setState(() {
              count = 30;
            });
            //结束刷新
            return;
          },
        ),
        buildSliverList(count),
        SliverToBoxAdapter(
          //可以嵌套任意非silver组件。
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 30),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.red, width: 1),
              color: Colors.yellow,
            ),
            child: const Text("获取更多"),
          ),
        ),
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
