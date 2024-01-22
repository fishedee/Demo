import 'package:demo/scroll/listView.dart';
import 'package:demo/scroll/listViewInfinite.dart';
import 'package:demo/scroll/scrollPhysis.dart';
import 'package:demo/scroll/singleChildScrollView.dart';
import 'package:demo/scroll/scrollBar.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageScrollRoutes = {
  "/scroll/singleChildScrollView": (context) =>
      const SingleChildScrollViewDemo(),
  "/scroll/scrollBar": (context) => const ScrollBarDemo(),
  "/scroll/scrollPhysis": (context) => const ScrollPhysisDemo(),
  "/scroll/listView": (context) => const ListViewDemo(),
  "/scroll/listViewInfinite": (context) => const ListViewInfiniteDemo(),
};
