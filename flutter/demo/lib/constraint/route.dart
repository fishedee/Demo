import 'package:demo/constraint/constraintBox.dart';
import 'package:demo/constraint/flow2.dart';
import 'package:demo/constraint/intrinsticHeight_expanded.dart';
import 'package:demo/constraint/intrinsticHeight_expanded_fix.dart';
import 'package:demo/constraint/intrinsticHeight_inListView.dart';
import 'package:demo/constraint/intrinsticHeight_stretch.dart';
import 'package:demo/constraint/intrinsticHeight_stretch_fix.dart';
import 'package:demo/constraint/listViewDefault.dart';
import 'package:demo/constraint/listViewInColumn.dart';
import 'package:demo/constraint/listViewInColumn_fix.dart';
import 'package:demo/constraint/listViewInRow.dart';
import 'package:demo/constraint/listViewInRowFix.dart';
import 'package:demo/constraint/listViewInfiniteHeight.dart';
import 'package:demo/constraint/listViewInfiniteWidth.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageConstraintRoutes = {
  "/constraint/constraintBox": (context) => const ConstraintBoxDemo(),
  "/constraint/flow2": (context) => const ExampleParallax(),
  "/constraint/listViewDefault": (context) => const ListViewDefaultDemo(),
  "/constraint/listViewInfiniteWidth": (context) =>
      const ListViewInfiniteWidthDemo(),
  "/constraint/listViewInfiniteHeight": (context) =>
      const ListViewInfiniteHeightDemo(),
  "/constraint/listViewInColumn": (context) => const ListViewInColumnDemo(),
  "/constraint/listViewInColumnFix": (context) =>
      const ListViewInColumnFixDemo(),
  "/constraint/listViewInRow": (context) => const ListViewInRowDemo(),
  "/constraint/listViewInRowFix": (context) => const ListViewInRowFixDemo(),
  "/constraint/intrinsticHeight_expanded": (context) =>
      const IntrinsticHeightExpanedDemo(),
  "/constraint/intrinsticHeight_expanded_fix": (context) =>
      const IntrinsticHeightExpandedFixDemo(),
  "/constraint/intrinsticHeight_stretch": (context) =>
      const IntrinsticHeightStretchDemo(),
  "/constraint/intrinsticHeight_stretch_fix": (context) =>
      const IntrinsticHeightStretchFixDemo(),
  "/constraint/intrinsticHeight_in_listview": (context) =>
      const IntrinsticInListViewDemo(),
};
