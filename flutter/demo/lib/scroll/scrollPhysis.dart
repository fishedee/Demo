import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class OverScrollBehavior extends ScrollBehavior {
  @override
  Widget buildOverscrollIndicator(
      BuildContext context, Widget child, ScrollableDetails details) {
    switch (getPlatform(context)) {
      case TargetPlatform.android:
      case TargetPlatform.fuchsia:
        return GlowingOverscrollIndicator(
          axisDirection: details.direction,
          //不显示头部水波纹
          showLeading: false,
          //不显示尾部水波纹
          showTrailing: false,
          color: Theme.of(context).hoverColor,
          child: child,
        );
      default:
        return super.buildScrollbar(context, child, details);
    }
  }
}

class ScrollPhysisDemo extends StatelessWidget {
  const ScrollPhysisDemo({
    Key? key,
  }) : super(key: key);

  Widget _buildClampingScrollPhysics() {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // 在Android和IOS环境下，都会显示普通的深色滚动条
    return SingleChildScrollView(
      physics: const ClampingScrollPhysics(),
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
    );
  }

  Widget _buildClampingScrollPhysicsAndNoneIndicator() {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // 在Android和IOS环境下，都会显示普通的深色滚动条
    return ScrollConfiguration(
      behavior: OverScrollBehavior(),
      child: SingleChildScrollView(
        physics: const ClampingScrollPhysics(),
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

  Widget _buildBouncingScrollPhysics() {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // BouncingScrollPhysics，边界反弹效果，类似IOS的效果
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
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
    );
  }

  @override
  Widget build(BuildContext context) {
    //如果单个页面有两个Scrollable的话，需要保证只有一个Scrollable的primary设置为true
    //这样才能保证都显示滚动条
    return Column(
      children: [
        Expanded(child: _buildClampingScrollPhysics()),
        Container(
          height: 30,
          color: Colors.red,
        ),
        Expanded(child: _buildClampingScrollPhysicsAndNoneIndicator()),
        Container(
          height: 30,
          color: Colors.red,
        ),
        Expanded(child: _buildBouncingScrollPhysics()),
      ],
    );
  }
}
