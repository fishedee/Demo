import 'package:flutter/material.dart';

class AlignAndCenterDemo extends StatelessWidget {
  const AlignAndCenterDemo({
    Key? key,
  }) : super(key: key);

  /*
  * Alignment的偏移计算公式，常用于Widget内部的偏移，以childWidth中间点来偏移。Alignment(this.x, this.y),x和y常取-1和1,0.
  实际偏移 = (Alignment.x * (parentWidth - childWidth) / 2 + (parentWidth - childWidth) / 2,
        Alignment.y * (parentHeight - childHeight) / 2 + (parentHeight - childHeight) / 2)
  */
  Widget _buildAlign() {
    return Container(
      height: 120.0,
      width: 120.0,
      color: Colors.blue.shade50,
      child: const Align(
        alignment: Alignment.topRight,
        child: FlutterLogo(
          size: 60,
        ),
      ),
    );
  }

  /*
  * FractionalOffset 以矩形左侧原点来偏移。
  实际偏移 = (FractionalOffse.x * (parentWidth - childWidth), FractionalOffse.y * (parentHeight - childHeight))
  */
  Widget _buildAlign2() {
    return Container(
      height: 120.0,
      width: 120.0,
      color: Colors.blue.shade50,
      child: const Align(
        alignment: FractionalOffset(0.2, 0.6),
        child: FlutterLogo(
          size: 60,
        ),
      ),
    );
  }

  //center其实就是Align
  Widget _buildCenter() {
    return Container(
      height: 120.0,
      width: 120.0,
      color: Colors.blue.shade50,
      child: const Center(
        child: FlutterLogo(
          size: 60,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: Column(
        children: [
          _buildAlign(),
          const SizedBox(height: 20),
          _buildAlign2(),
          const SizedBox(height: 20),
          _buildCenter(),
        ],
      ),
    );
  }
}
