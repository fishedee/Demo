import 'package:flutter/material.dart';

class DialogDemo extends StatefulWidget {
  const DialogDemo({
    super.key,
  });

  @override
  State<DialogDemo> createState() => _DialogDemo();
}

class _DialogDemo extends State<DialogDemo> {
  @override
  Widget build(BuildContext context) {
    var counter = 0;
    return Column(children: [
      ElevatedButton(
        onPressed: () async {
          final result = await showDialog<bool>(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text("提示"),
                content: const Text("您确定要删除当前文件吗?"),
                actions: <Widget>[
                  TextButton(
                    child: const Text("取消"),
                    onPressed: () => Navigator.of(context).pop(), // 关闭对话框
                  ),
                  TextButton(
                    child: const Text("删除"),
                    onPressed: () {
                      //关闭对话框并返回true
                      Navigator.of(context).pop(true);
                    },
                  ),
                ],
              );
            },
          );
          print('AlertDialog result:$result');
        },
        child: const Text("点我打开normalDialog"),
      ),
      ElevatedButton(
        onPressed: () async {
          final result = await showDialog<int>(
            context: context,
            builder: (context) {
              return SimpleDialog(
                title: const Text('请选择语言'),
                children: <Widget>[
                  SimpleDialogOption(
                    onPressed: () {
                      // 返回1
                      Navigator.pop(context, 1);
                    },
                    child: const Padding(
                      padding: EdgeInsets.symmetric(vertical: 6),
                      child: Text('中文简体'),
                    ),
                  ),
                  SimpleDialogOption(
                    onPressed: () {
                      // 返回2
                      Navigator.pop(context, 2);
                    },
                    child: const Padding(
                      padding: EdgeInsets.symmetric(vertical: 6),
                      child: Text('美国英语'),
                    ),
                  ),
                ],
              );
            },
          );
          print('SimpleDialog result:$result');
        },
        child: const Text("点我打开simpleDialog"),
      ),
      ElevatedButton(
        onPressed: () async {
          final result = await showCustomDialog<bool>(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text("提示"),
                content: const Text("您确定要删除当前文件吗?"),
                actions: <Widget>[
                  TextButton(
                    child: const Text("取消"),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  TextButton(
                    child: const Text("删除"),
                    onPressed: () {
                      // 执行删除操作
                      Navigator.of(context).pop(true);
                    },
                  ),
                ],
              );
            },
          );
          print('showCustomDialog result:$result');
        },
        child: const Text("点我打开customDialog"),
      ),
    ]);
  }
}

Future<T?> showCustomDialog<T>({
  required BuildContext context,
  bool barrierDismissible = true,
  required WidgetBuilder builder,
  ThemeData? theme,
}) {
  final ThemeData theme = Theme.of(context);
  return showGeneralDialog(
    context: context,
    pageBuilder: (BuildContext buildContext, Animation<double> animation,
        Animation<double> secondaryAnimation) {
      final Widget pageChild = Builder(builder: builder);
      return SafeArea(
        child: Builder(builder: (BuildContext context) {
          return Theme(data: theme, child: pageChild);
        }),
      );
    },
    barrierDismissible: barrierDismissible,
    barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
    barrierColor: Colors.black87, // 自定义遮罩颜色
    transitionDuration: const Duration(milliseconds: 150),
    transitionBuilder: _buildMaterialDialogTransitions,
  );
}

Widget _buildMaterialDialogTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child) {
  // 使用缩放动画
  return ScaleTransition(
    scale: CurvedAnimation(
      parent: animation,
      curve: Curves.easeOut,
    ),
    child: child,
  );
}
