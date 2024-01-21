import 'package:flutter/material.dart';

class flexWrapDemo extends StatelessWidget {
  const flexWrapDemo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    //Wrap就是允许wrap的flex而已，flex的属性它都允许使用
    return const Align(
        alignment: Alignment.topCenter,
        child: Wrap(
          spacing: 8.0, // 主轴(水平)方向间距
          runSpacing: 4.0, // 纵轴（垂直）方向间距
          alignment: WrapAlignment.center, //沿主轴方向居中
          children: <Widget>[
            Chip(
              avatar:
                  CircleAvatar(backgroundColor: Colors.blue, child: Text('A')),
              label: Text('Hamilton'),
            ),
            Chip(
              avatar:
                  CircleAvatar(backgroundColor: Colors.blue, child: Text('M')),
              label: Text('Lafayette'),
            ),
            Chip(
              avatar:
                  CircleAvatar(backgroundColor: Colors.blue, child: Text('H')),
              label: Text('Mulligan'),
            ),
            Chip(
              avatar:
                  CircleAvatar(backgroundColor: Colors.blue, child: Text('J')),
              label: Text('Laurens'),
            ),
          ],
        ));
  }
}
