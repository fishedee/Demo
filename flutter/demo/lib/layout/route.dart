import 'package:demo/layout/alignAndCenter.dart';
import 'package:demo/layout/columnStretchAndMainSize.dart';
import 'package:demo/layout/flexWrap.dart';
import 'package:demo/layout/flowBasic.dart';
import 'package:demo/layout/flowParallax.dart';
import 'package:demo/layout/layoutBuilder.dart';
import 'package:demo/layout/rowAxisAndDirection.dart';
import 'package:demo/layout/flexAndExpanded.dart';
import 'package:demo/layout/stackFit.dart';
import 'package:demo/layout/stackNormal.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageLayoutRoutes = {
  "/layout/rowAxisAndDirection": (context) => const RowAxisAndDirectionDemo(),
  "/layout/columnStretchAndMainSize": (context) =>
      const ColumnStretchAndMainSizeDemo(),
  "/layout/flexAndExpanded": (context) => const flexAndExpandedDemo(),
  "/layout/flexWrap": (context) => const flexWrapDemo(),
  "/layout/flowBasic": (context) => const FlowBasicDemo(),
  "/layout/flowParallel": (context) => const FlowParallaxDemo(),
  "/layout/stackNormal": (context) => const StackNormalDemo(),
  "/layout/stackFit": (context) => const StackFitDemo(),
  "/layout/alignAndCenter": (context) => const AlignAndCenterDemo(),
  "/layout/layoutBuilder": (context) => const LayoutBuilderDemo(),
};
