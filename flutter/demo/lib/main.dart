import 'package:demo/constraint/route.dart';
import 'package:demo/container/route.dart';
import 'package:demo/layout/route.dart';
import 'package:demo/routeWidget.dart';
import 'package:demo/scroll/route.dart';
import 'package:demo/sliver/route.dart';
import 'package:demo/ui_basic/route.dart';
import 'package:flutter/material.dart';
import 'state/route.dart';

Map<String, WidgetBuilder> topRoutes = {
  '/state': (context) => RouteWidget(routes: pageStateRoutes),
  '/ui_basic': (context) => RouteWidget(routes: pageUiBasicRoutes),
  '/constraint': (context) => RouteWidget(routes: pageConstraintRoutes),
  "/layout": (context) => RouteWidget(routes: pageLayoutRoutes),
  "/container": (context) => RouteWidget(routes: pageContainerRoutes),
  "/scroll": (context) => RouteWidget(routes: pageScrollRoutes),
  "/sliver": (context) => RouteWidget(routes: pageSliverRoutes),
};

Widget homeWidget = RouteWidget(routes: topRoutes);

void main() {
  runApp(MaterialApp(
    theme: ThemeData(useMaterial3: false),
    routes: RouteWidget.mapRoutes({
      ...pageStateRoutes,
      ...pageUiBasicRoutes,
      ...pageConstraintRoutes,
      ...pageLayoutRoutes,
      ...pageContainerRoutes,
      ...pageScrollRoutes,
      ...pageSliverRoutes,
      ...topRoutes,
      "/": (context) => homeWidget,
    }),
    initialRoute: "/sliver/sliverNestedScrollView",
  ));
}
