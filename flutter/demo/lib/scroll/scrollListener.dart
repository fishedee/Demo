import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ScrollListenerDemo extends StatefulWidget {
  const ScrollListenerDemo({
    Key? key,
  }) : super(key: key);

  @override
  State<ScrollListenerDemo> createState() => _ScrollListenerDemo();
}

class _ScrollListenerDemo extends State<ScrollListenerDemo> {
  final ScrollController _controller = ScrollController();

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      print('listView1 offset ${_controller.offset}');
    });
  }

  Widget _buildNormalListView() {
    var size = 20;
    return ListView(
      controller: _controller,
      children: List.generate(size, (index) {
        index++;
        var str = "";
        for (var i = 0; i != index; i++) {
          str += "[Text $index]";
        }
        return Text(str);
      }),
    );
  }

  Widget _buildNormalListView2() {
    /*
    在接收到滚动事件时，参数类型为ScrollNotification，它包括一个metrics属性，它的类型是ScrollMetrics，该属性包含当前ViewPort及滚动位置等信息：
    pixels：当前滚动位置。
    maxScrollExtent：最大可滚动长度。
    extentBefore：滑出ViewPort顶部的长度；此示例中相当于顶部滑出屏幕上方的列表长度。
    extentInside：ViewPort内部长度；此示例中屏幕显示的列表部分的长度。
    extentAfter：列表中未滑入ViewPort部分的长度；此示例中列表底部未显示到屏幕范围部分的长度。
    atEdge：是否滑到了可滚动组件的边界（此示例中相当于列表顶或底部）。
    ScrollMetrics还有一些其他属性，读者可以自行查阅API文档。
    */
    var size = 20;
    //使用事件冒泡的方式来做滚动监听，可以得到较为丰富的事件消息。
    return NotificationListener<ScrollNotification>(
      /*
      /// Return true to cancel the notification bubbling. Return false to
      /// allow the notification to continue to be dispatched to further ancestors.
      */
      onNotification: (ScrollNotification notification) {
        print(
            'listView2 offset ${notification.metrics.pixels} ${notification.metrics.maxScrollExtent} ${notification.metrics.atEdge}');
        return false;
      },
      child: ListView(
        children: List.generate(size, (index) {
          index++;
          var str = "";
          for (var i = 0; i != index; i++) {
            str += "[Text $index]";
          }
          return Text(str);
        }),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    //如果单个页面有两个Scrollable的话，需要保证只有一个Scrollable的primary设置为true
    //这样才能保证都显示滚动条
    return Column(
      children: [
        ElevatedButton(
            onPressed: () {
              _controller.animateTo(
                0,
                duration: const Duration(milliseconds: 200),
                curve: Curves.ease,
              );
            },
            child: const Text('返回顶部')),
        Expanded(child: _buildNormalListView()),
        Container(
          height: 30,
          color: Colors.red,
        ),
        Expanded(child: _buildNormalListView2()),
      ],
    );
  }
}
