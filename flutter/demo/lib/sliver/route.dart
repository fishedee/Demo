import 'package:demo/sliver/sliver.dart';
import 'package:demo/sliver/sliverCustom.dart';
import 'package:demo/sliver/sliverCustom2.dart';
import 'package:demo/sliver/sliverMainAxisGroup.dart';
import 'package:demo/sliver/sliverNestedScrollView.dart';
import 'package:demo/sliver/sliverNestedScrollView2.dart';
import 'package:demo/sliver/sliverPersistHeader.dart';
import 'package:demo/sliver/sliverRefreshControl.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageSliverRoutes = {
  '/sliver/sliver': (context) => const SliverDemo(),
  '/sliver/sliverPersistHeader': (context) => const SliverPersistHeaderDemo(),
  '/sliver/sliverMainAxisGroup': (context) => const SliverMainAxisGroupDemo(),
  '/sliver/sliverRefreshControl': (context) => const SliverRefreshControlDemo(),
  '/sliver/sliverCustom': (context) => const SliverCustomDemo(),
  '/sliver/sliverCustom2': (context) => const SliverCustomDemo2(),
  '/sliver/sliverNestedScrollView': (context) =>
      const SliverNestedScrollViewDemo(),
  '/sliver/sliverNestedScrollView2': (context) =>
      const SliverNestedScrollViewDemo2(),
};
