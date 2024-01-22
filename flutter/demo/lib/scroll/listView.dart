import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ListViewDemo extends StatelessWidget {
  const ListViewDemo({
    Key? key,
  }) : super(key: key);

  Widget _buildNormalListView() {
    //非lazy形式的listView，不推荐使用，会导致所有的Widget都会提前渲染。
    var size = 20;
    return ListView(
      primary: true,
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

  Widget _buildLazyListView() {
    //Lazy形式的listView，推荐使用，Widget按需加载
    return ListView.builder(
      primary: false,
      itemCount: 20,
      itemBuilder: (BuildContext context, int index) {
        index++;
        var str = "";
        for (var i = 0; i != index; i++) {
          str += "[Text $index]";
        }
        return Text(str);
      },
    );
  }

  Widget _buildLazyListViewFixHeight() {
    return ListView.builder(
      primary: false,
      itemCount: 20,
      //指定了itemExtent以后，每个项的高度都是高度的，无法变更
      //item项小的话，会提高高度，保证高度为itemExtent
      //item项大的话，会截取高度，保证高度为itemExtent
      itemExtent: 30,
      itemBuilder: (BuildContext context, int index) {
        index++;
        var str = "";
        for (var i = 0; i != index; i++) {
          str += "[Text $index]";
        }
        return Text(str);
      },
    );
  }

  Widget _buildLazyListViewPrototypeHeight() {
    return ListView.builder(
      primary: false,
      itemCount: 20,
      //指定了prototypeItem的话，以prototypeItem的高度作为每个项的实际高度
      //item项小的话，会提高高度，保证高度为prototypeItem的高度
      //item项大的话，会截取高度，保证高度为prototypeItem的高度
      prototypeItem: const Text("Text 1"),
      itemBuilder: (BuildContext context, int index) {
        index++;
        var str = "";
        for (var i = 0; i != index; i++) {
          str += "[Text $index]";
        }
        return Text(str);
      },
    );
  }

  Widget _buildLazyListViewWithSeperator() {
    //下划线widget预定义以供复用。
    Widget divider1 = const Divider(
      color: Colors.blue,
    );
    Widget divider2 = const Divider(color: Colors.green);
    //Lazy形式的listView，推荐使用，Widget按需加载
    return ListView.separated(
      primary: false,
      itemCount: 20,
      itemBuilder: (BuildContext context, int index) {
        index++;
        var str = "";
        for (var i = 0; i != index; i++) {
          str += "[Text $index]";
        }
        return Text(str);
      },
      //分割器构造器
      separatorBuilder: (BuildContext context, int index) {
        return index % 2 == 0 ? divider1 : divider2;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    //如果单个页面有两个Scrollable的话，需要保证只有一个Scrollable的primary设置为true
    //这样才能保证都显示滚动条
    return Column(
      children: [
        Expanded(child: _buildNormalListView()),
        Container(
          height: 30,
          color: Colors.red,
        ),
        Expanded(child: _buildLazyListView()),
        Container(
          height: 10,
          color: Colors.red,
        ),
        Expanded(child: _buildLazyListViewFixHeight()),
        Container(
          height: 10,
          color: Colors.red,
        ),
        Expanded(child: _buildLazyListViewPrototypeHeight()),
        Container(
          height: 10,
          color: Colors.red,
        ),
        Expanded(child: _buildLazyListViewWithSeperator()),
      ],
    );
  }
}
