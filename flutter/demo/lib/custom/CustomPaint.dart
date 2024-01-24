import 'package:flutter/material.dart';
import 'dart:math';

class CustomPaintDemo extends StatelessWidget {
  const CustomPaintDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StatefulBuilder(builder: (context, setState) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            //放入独立的画布上渲染，避免上面的对象渲染导致下方需要重绘
            RepaintBoundary(
              child: CustomPaint(
                size: const Size(300, 300), //指定画布大小
                painter: MyPainter(),
              ),
            ),
            //添加一个刷新button
            ElevatedButton(
                onPressed: () {
                  setState(() {});
                },
                child: const Text("刷新"))
          ],
        ),
      );
    });
  }
}

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    print('paint');
    var rect = Offset.zero & size;
    //画棋盘
    drawChessboard(canvas, rect);
    //画棋子
    drawPieces(canvas, rect);
  }

  void drawChessboard(Canvas canvas, Rect rect) {
    //棋盘背景
    var paint = Paint()
      ..isAntiAlias = true
      ..style = PaintingStyle.fill //填充
      ..color = const Color(0xFFDCC48C);
    canvas.drawRect(rect, paint);

    //画棋盘网格
    paint
      ..style = PaintingStyle.stroke //线
      ..color = Colors.black38
      ..strokeWidth = 1.0;

    //画横线
    for (int i = 0; i <= 15; ++i) {
      double dy = rect.top + rect.height / 15 * i;
      canvas.drawLine(Offset(rect.left, dy), Offset(rect.right, dy), paint);
    }

    for (int i = 0; i <= 15; ++i) {
      double dx = rect.left + rect.width / 15 * i;
      canvas.drawLine(Offset(dx, rect.top), Offset(dx, rect.bottom), paint);
    }
  }

  //画棋子
  void drawPieces(Canvas canvas, Rect rect) {
    double eWidth = rect.width / 15;
    double eHeight = rect.height / 15;
    //画一个黑子
    var paint = Paint()
      ..style = PaintingStyle.fill
      ..color = Colors.black;
    //画一个黑子
    canvas.drawCircle(
      Offset(rect.center.dx - eWidth / 2, rect.center.dy - eHeight / 2),
      min(eWidth / 2, eHeight / 2) - 2,
      paint,
    );
    //画一个白子
    paint.color = Colors.white;
    canvas.drawCircle(
      Offset(rect.center.dx + eWidth / 2, rect.center.dy - eHeight / 2),
      min(eWidth / 2, eHeight / 2) - 2,
      paint,
    );
  }

/*
2. 绘制性能
绘制是比较昂贵的操作，所以我们在实现自绘控件时应该考虑到性能开销，下面是两条关于性能优化的建议：

尽可能的利用好shouldRepaint返回值；在UI树重新build时，控件在绘制前都会先调用该方法以确定是否有必要重绘；假如我们绘制的UI不依赖外部状态，即外部状态改变不会影响我们的UI外观，那么就应该返回false；如果绘制依赖外部状态，那么我们就应该在shouldRepaint中判断依赖的状态是否改变，如果已改变则应返回true来重绘，反之则应返回false不需要重绘。

绘制尽可能多的分层；在上面五子棋的示例中，我们将棋盘和棋子的绘制放在了一起，这样会有一个问题：由于棋盘始终是不变的，用户每次落子时变的只是棋子，但是如果按照上面的代码来实现，每次绘制棋子时都要重新绘制一次棋盘，这是没必要的。优化的方法就是将棋盘单独抽为一个组件，并设置其shouldRepaint回调值为false，然后将棋盘组件作为背景。然后将棋子的绘制放到另一个组件中，这样每次落子时只需要绘制棋子。
*/
  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    //
    return false;
  }
}
