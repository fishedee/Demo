import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ScrollOffsetStorageDemo extends StatefulWidget {
  const ScrollOffsetStorageDemo({super.key});

  @override
  State<ScrollOffsetStorageDemo> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<ScrollOffsetStorageDemo> {
  final List<Widget> pages = const <Widget>[
    ColorBoxPage(
      //PageStorageKey属于localKey的范畴
      //但是PageStorage检查到widget退出的时候，都会保存scrollOffset
      //新widget进来的时候，就会恢复scrollOffset
      key: PageStorageKey<String>('pageOne'),
    ),
    ColorBoxPage(
        //这个页面有PageStorageKey，所以每次滚动位置都会丢失
        //key: PageStorageKey<String>('pageTwo'),
        ),
  ];
  int currentTab = 0;
  final PageStorageBucket _bucket = PageStorageBucket();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //body每次，仅显示当前Widget，另外一个Widget就会销毁
      //PageStorage在顶层记录每个PageStorageKey对应的位置
      body: PageStorage(
        bucket: _bucket,
        child: pages[currentTab],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentTab,
        onTap: (int index) {
          setState(() {
            currentTab = index;
          });
        },
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'page 1',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'page2',
          ),
        ],
      ),
    );
  }
}

class ColorBoxPage extends StatelessWidget {
  const ColorBoxPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemExtent: 250.0,
      itemBuilder: (BuildContext context, int index) => Container(
        padding: const EdgeInsets.all(10.0),
        child: Material(
          color: index.isEven ? Colors.cyan : Colors.deepOrange,
          child: Center(
            child: Text(index.toString()),
          ),
        ),
      ),
    );
  }
}
