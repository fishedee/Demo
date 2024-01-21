import 'package:demo/layout/constraintBox.dart';
import 'package:demo/layout/flow2.dart';
import 'package:demo/layout/intrinsticHeight_expanded.dart';
import 'package:demo/layout/intrinsticHeight_expanded_fix.dart';
import 'package:demo/layout/intrinsticHeight_stretch.dart';
import 'package:demo/layout/intrinsticHeight_stretch_fix.dart';
import 'package:demo/layout/listViewDefault.dart';
import 'package:demo/layout/listViewInColumn.dart';
import 'package:demo/layout/listViewInColumn_fix.dart';
import 'package:demo/layout/listViewInRow.dart';
import 'package:demo/layout/listViewInRowFix.dart';
import 'package:demo/layout/listViewInfiniteHeight.dart';
import 'package:demo/layout/listViewInfiniteWidth.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageLayoutRoutes = {
  "/layout/constraintBox": (context) => const ConstraintBoxDemo(),
  "/layout/flow2": (context) => const ExampleParallax(),
  "/layout/listViewDefault": (context) => const ListViewDefaultDemo(),
  "/layout/listViewInfiniteWidth": (context) =>
      const ListViewInfiniteWidthDemo(),
  "/layout/listViewInfiniteHeight": (context) =>
      const ListViewInfiniteHeightDemo(),
  "/layout/listViewInColumn": (context) => const ListViewInColumnDemo(),
  "/layout/listViewInColumnFix": (context) => const ListViewInColumnFixDemo(),
  "/layout/listViewInRow": (context) => const ListViewInRowDemo(),
  "/layout/listViewInRowFix": (context) => const ListViewInRowFixDemo(),
  "/layout/intrinsticHeight_expanded": (context) =>
      const IntrinsticHeightExpanedDemo(),
  "/layout/intrinsticHeight_expanded_fix": (context) =>
      const IntrinsticHeightExpandedFixDemo(),
  "/layout/intrinsticHeight_stretch": (context) =>
      const IntrinsticHeightStretchDemo(),
  "/layout/intrinsticHeight_stretch_fix": (context) =>
      const IntrinsticHeightStretchFixDemo(),
};
