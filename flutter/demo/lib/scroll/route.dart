import 'package:demo/scroll/animatedList.dart';
import 'package:demo/scroll/gridView.dart';
import 'package:demo/scroll/gridViewInfinite.dart';
import 'package:demo/scroll/listView.dart';
import 'package:demo/scroll/listViewInfinite.dart';
import 'package:demo/scroll/pageView.dart';
import 'package:demo/scroll/pageViewCacheExtent.dart';
import 'package:demo/scroll/scrollListener.dart';
import 'package:demo/scroll/scrollOffsetStorage.dart';
import 'package:demo/scroll/scrollPhysis.dart';
import 'package:demo/scroll/singleChildScrollView.dart';
import 'package:demo/scroll/scrollBar.dart';
import 'package:demo/scroll/tabBarView.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageScrollRoutes = {
  "/scroll/singleChildScrollView": (context) =>
      const SingleChildScrollViewDemo(),
  "/scroll/scrollBar": (context) => const ScrollBarDemo(),
  "/scroll/scrollPhysis": (context) => const ScrollPhysisDemo(),
  "/scroll/listView": (context) => const ListViewDemo(),
  "/scroll/listViewInfinite": (context) => const ListViewInfiniteDemo(),
  "/scroll/gridView": (context) => GridViewDemo(),
  "/scroll/gridViewInfinite": (context) => const GridViewInfiniteDemo(),
  "/scroll/animatedList": (context) => const AnimatedListDemo(),
  '/scroll/scrollListener': (context) => const ScrollListenerDemo(),
  '/scroll/scrollOffsetStorage': (context) => const ScrollOffsetStorageDemo(),
  '/scroll/pageView': (context) => const PageViewDemo(),
  '/scroll/pageViewCacheExtent': (context) => const PageViewCacheExtentDemo(),
  '/scroll/tabBarView': (context) => const TabBarViewDemo(),
};
