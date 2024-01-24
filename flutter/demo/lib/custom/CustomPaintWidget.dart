import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

class CustomPaintWidgetDemo extends StatelessWidget {
  const CustomPaintWidgetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    var counter = 0;
    return StatefulBuilder(builder: (context, setState) {
      return Align(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 100,
              height: 100,
              child: DoneWidget(key: ValueKey(counter)),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  counter++;
                });
              },
              child: const Text("刷新"),
            )
          ],
        ),
      );
    });
  }
}

class DoneWidget extends LeafRenderObjectWidget {
  const DoneWidget({
    super.key,
    this.strokeWidth = 2.0,
    this.color = Colors.green,
    this.outline = false,
  });

  //线条宽度
  final double strokeWidth;
  //轮廓颜色或填充色
  final Color color;
  //如果为true，则没有填充色，color代表轮廓的颜色；如果为false，则color为填充色
  final bool outline;

  @override
  RenderObject createRenderObject(BuildContext context) {
    print('createRenderObject key:${key}');
    return RenderDoneObject(
      strokeWidth,
      color,
      outline,
    )..animationStatus = AnimationStatus.forward; // 创建时执行正向动画
  }

  @override
  void updateRenderObject(context, RenderDoneObject renderObject) {
    print('updateRenderObject key:${key}');
    renderObject
      ..strokeWidth = strokeWidth
      ..outline = outline
      ..color = color;
  }
}

class RenderDoneObject extends RenderBox with RenderObjectAnimationMixin {
  double strokeWidth;
  Color color;
  bool outline;

  ValueChanged<bool>? onChanged;

  RenderDoneObject(
    this.strokeWidth,
    this.color,
    this.outline,
  );

  // 动画执行时间为 300ms
  @override
  Duration get duration => const Duration(milliseconds: 300);

  @override
  void doPaint(PaintingContext context, Offset offset) {
    // 可以对动画运用曲线
    Curve curve = Curves.easeIn;
    final _progress = curve.transform(progress);

    Rect rect = offset & size;
    final paint = Paint()
      ..isAntiAlias = true
      ..style = outline ? PaintingStyle.stroke : PaintingStyle.fill //填充
      ..color = color;

    if (outline) {
      paint.strokeWidth = strokeWidth;
      rect = rect.deflate(strokeWidth / 2);
    }

    // 画背景圆
    context.canvas.drawCircle(rect.center, rect.shortestSide / 2, paint);

    paint
      ..style = PaintingStyle.stroke
      ..color = outline ? color : Colors.white
      ..strokeWidth = strokeWidth;

    final path = Path();

    Offset firstOffset =
        Offset(rect.left + rect.width / 6, rect.top + rect.height / 2.1);

    final secondOffset = Offset(
      rect.left + rect.width / 2.5,
      rect.bottom - rect.height / 3.3,
    );

    path.moveTo(firstOffset.dx, firstOffset.dy);

    const adjustProgress = .6;
    //画 "勾"
    if (_progress < adjustProgress) {
      //第一个点到第二个点的连线做动画(第二个点不停的变)
      Offset _secondOffset = Offset.lerp(
        firstOffset,
        secondOffset,
        _progress / adjustProgress,
      )!;
      path.lineTo(_secondOffset.dx, _secondOffset.dy);
    } else {
      //链接第一个点和第二个点
      path.lineTo(secondOffset.dx, secondOffset.dy);
      //第三个点位置随着动画变，做动画
      final lastOffset = Offset(
        rect.right - rect.width / 5,
        rect.top + rect.height / 3.5,
      );
      Offset _lastOffset = Offset.lerp(
        secondOffset,
        lastOffset,
        (progress - adjustProgress) / (1 - adjustProgress),
      )!;
      path.lineTo(_lastOffset.dx, _lastOffset.dy);
    }
    context.canvas.drawPath(path, paint..style = PaintingStyle.stroke);
  }

  @override
  void performLayout() {
    // 如果父组件指定了固定宽高，则使用父组件指定的，否则宽高默认置为 25
    size = constraints.constrain(
      constraints.isTight ? Size.infinite : const Size(25, 25),
    );
  }
}

mixin RenderObjectAnimationMixin on RenderObject {
  double _progress = 0;
  int? _lastTimeStamp;

  // 动画时长，子类可以重写
  Duration get duration => const Duration(milliseconds: 1000);
  AnimationStatus _animationStatus = AnimationStatus.completed;
  // 设置动画状态
  set animationStatus(AnimationStatus v) {
    if (_animationStatus != v) {
      markNeedsPaint();
    }
    _animationStatus = v;
  }

  double get progress => _progress;
  set progress(double v) {
    _progress = v.clamp(0, 1);
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    // 调用子类绘制逻辑，子类根据progress作渲染
    doPaint(context, offset);

    _scheduleAnimation();
  }

  void _scheduleAnimation() {
    if (_animationStatus != AnimationStatus.completed) {
      //当前动画未完成的情况下，都需要标记下一帧动画的触发回调
      //需要在Flutter 当前frame 结束之前再执行，因为不能在绘制过程中又将组件标记为需要重绘
      SchedulerBinding.instance.addPostFrameCallback((Duration timeStamp) {
        if (_lastTimeStamp != null) {
          //根据时间差计算当前的progress进度变化值delta
          double delta = (timeStamp.inMilliseconds - _lastTimeStamp!) /
              duration.inMilliseconds;

          //在特定情况下，可能在一帧中连续的往frameCallback中添加了多次，导致两次回调时间间隔为0，
          //这种情况下应该继续请求重绘。
          if (delta == 0) {
            markNeedsPaint();
            return;
          }

          if (_animationStatus == AnimationStatus.reverse) {
            delta = -delta;
          }
          _progress = _progress + delta;
          if (_progress >= 1 || _progress <= 0) {
            _animationStatus = AnimationStatus.completed;
            _progress = _progress.clamp(0, 1);
          }
        }
        //标记重绘，注意是markNeedPaint，不是markNeedsLayout()，不需要重排版。
        markNeedsPaint();
        _lastTimeStamp = timeStamp.inMilliseconds;
      });
    } else {
      _lastTimeStamp = null;
    }
  }

  // 子类实现绘制逻辑的地方
  void doPaint(PaintingContext context, Offset offset);
}
