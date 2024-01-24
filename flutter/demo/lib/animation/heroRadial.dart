// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

// A "radial transformation" as defined here:
// https://m1.material.io/motion/transforming-material.html#transforming-material-radial-transformation

// In this example, the destination route (which completely obscures
// the source route once the page transition has finished),
// displays the Hero image in a Card containing a column of two
// widgets: the image, and some descriptive text.

import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;

class Photo extends StatelessWidget {
  const Photo({super.key, required this.photo, this.onTap});

  final String photo;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      // Slightly opaque color appears where the image has transparency.
      color: Theme.of(context).primaryColor.withOpacity(0.25),
      child: InkWell(
        onTap: onTap,
        child: LayoutBuilder(
          builder: (context, size) {
            return Image.asset(
              photo,
              fit: BoxFit.contain,
            );
          },
        ),
      ),
    );
  }
}

class RadialExpansion extends StatelessWidget {
  //maxRadius是外圆半径
  //clipRectSize是外圆内接矩形的边长，为maxRadius/sqrt(2) * 2。
  const RadialExpansion({
    super.key,
    required this.maxRadius,
    this.child,
  }) : clipRectSize = 2.0 * (maxRadius / math.sqrt2);

  final double maxRadius;
  final double clipRectSize;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    /*仅有ClipOval的话，就只进行ClipOval的圆形剪裁
    return ClipOval(
      child: child
    );
    */
    //ClipOval先剪圆，然后内接一个ClipRect（正方形）来进行剪矩形
    //hero开始的时候，ClipOval较小，clipRectSize比较大，所以ClipRect不起效果，显示出来就是圆形
    //hero结束的时候，ClipOval较大，clipRectSize相对小，所以ClipRect起效果，显示出来就是矩形
    return ClipOval(
      child: Center(
        child: SizedBox(
          width: clipRectSize,
          height: clipRectSize,
          child: ClipRect(
            child: child,
          ),
        ),
      ),
    );
  }
}

class HeroRadialDemo extends StatelessWidget {
  const HeroRadialDemo({super.key});

  //半径
  static double kMinRadius = 32.0;
  static double kMaxRadius = 128.0;
  static Interval opacityCurve =
      const Interval(0.0, 0.75, curve: Curves.fastOutSlowIn);

  static RectTween _createRectTween(Rect? begin, Rect? end) {
    return MaterialRectCenterArcTween(begin: begin, end: end);
  }

  static Widget _buildPage(
      BuildContext context, String imageName, String description) {
    return Container(
      color: Theme.of(context).canvasColor,
      child: Center(
        child: Card(
          elevation: 8,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: kMaxRadius * 2.0,
                height: kMaxRadius * 2.0,
                child: Hero(
                  createRectTween: _createRectTween,
                  tag: imageName,
                  child: RadialExpansion(
                    maxRadius: kMaxRadius,
                    child: Photo(
                      photo: imageName,
                      onTap: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ),
                ),
              ),
              Text(
                description,
                style: const TextStyle(fontWeight: FontWeight.bold),
                textScaler: const TextScaler.linear(3),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHero(
    BuildContext context,
    String imageName,
    String description,
  ) {
    return SizedBox(
      width: kMinRadius * 2.0,
      height: kMinRadius * 2.0,
      child: Hero(
        createRectTween: _createRectTween,
        tag: imageName,
        child: RadialExpansion(
          maxRadius: kMaxRadius,
          child: Photo(
            photo: imageName,
            onTap: () {
              Navigator.of(context).push(
                PageRouteBuilder<void>(
                  pageBuilder: (context, animation, secondaryAnimation) {
                    //animation是页面切换的0~1进度条
                    //页面自身的切换动画效果，opacity
                    return AnimatedBuilder(
                      //AnimatedBuilder，将组件绑定到animation的lister
                      animation: animation,
                      builder: (context, child) {
                        return Opacity(
                          //opacityCurve从0和1进度，转换到曲线的opacity
                          opacity: opacityCurve.transform(animation.value),
                          child: _buildPage(context, imageName, description),
                        );
                      },
                    );
                  },
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    timeDilation = 5.0; // 1.0 is normal animation speed.

    return Container(
      padding: const EdgeInsets.all(32),
      alignment: FractionalOffset.bottomLeft,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildHero(context, 'assets/images/chair-alpha.png', 'Chair'),
          _buildHero(
              context, 'assets/images/binoculars-alpha.png', 'Binoculars'),
          _buildHero(
              context, 'assets/images/beachball-alpha.png', 'Beach ball'),
        ],
      ),
    );
  }
}
