import 'package:demo/layout/route.dart';
import 'package:demo/routeWidget.dart';
import 'package:demo/ui_basic/route.dart';
import 'package:flutter/material.dart';
import 'state/route.dart';

Map<String, WidgetBuilder> topRoutes = {
  '/state': (context) => RouteWidget(routes: pageStateRoutes),
  '/ui_basic': (context) => RouteWidget(routes: pageUiBasicRoutes),
  '/layout': (context) => RouteWidget(routes: pageLayoutRoutes),
};

Widget homeWidget = RouteWidget(routes: topRoutes);

void main() {
  runApp(MaterialApp(
    theme: ThemeData(useMaterial3: false),
    routes: RouteWidget.mapRoutes({
      ...pageStateRoutes,
      ...pageUiBasicRoutes,
      ...pageLayoutRoutes,
      ...topRoutes,
      "/": (context) => homeWidget,
    }),
    initialRoute: "/layout/listViewInRowFix",
  ));
}
