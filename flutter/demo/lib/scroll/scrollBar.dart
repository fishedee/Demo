import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ScrollBarDemo extends StatelessWidget {
  const ScrollBarDemo({
    Key? key,
  }) : super(key: key);

  Widget _buildNormalScrollBar() {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // 在Android和IOS环境下，都会显示普通的深色滚动条
    return Scrollbar(
      child: SingleChildScrollView(
        primary: true,
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            //动态创建一个List<Widget>
            children: str
                .split("")
                //每一个字母都用一个Text显示,字体为原来的两倍
                .map((c) => Text(
                      c,
                      textScaler: const TextScaler.linear(2),
                    ))
                .toList(),
          ),
        ),
      ),
    );
  }

  Widget _buildIosScrollBar() {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // 在IOS环境下，会显示半透明，圆角的滚动条
    // 在Android会显示普通的深色滚动条
    return CupertinoScrollbar(
      child: SingleChildScrollView(
        primary: false,
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            //动态创建一个List<Widget>
            children: str
                .split("")
                //每一个字母都用一个Text显示,字体为原来的两倍
                .map((c) => Text(
                      c,
                      textScaler: const TextScaler.linear(2),
                    ))
                .toList(),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    //如果单个页面有两个Scrollable的话，需要保证只有一个Scrollable的primary设置为true
    //这样才能保证都显示滚动条
    return Column(
      children: [
        Expanded(child: _buildNormalScrollBar()),
        Container(
          height: 30,
          color: Colors.red,
        ),
        Expanded(child: _buildIosScrollBar()),
      ],
    );
  }
}
