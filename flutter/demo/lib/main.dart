import 'package:demo/constraint/route.dart';
import 'package:demo/routeWidget.dart';
import 'package:demo/ui_basic/route.dart';
import 'package:flutter/material.dart';
import 'state/route.dart';

Map<String, WidgetBuilder> topRoutes = {
  '/state': (context) => RouteWidget(routes: pageStateRoutes),
  '/ui_basic': (context) => RouteWidget(routes: pageUiBasicRoutes),
  '/constraint': (context) => RouteWidget(routes: pageConstraintRoutes),
};

Widget homeWidget = RouteWidget(routes: topRoutes);

void main() {
  runApp(MaterialApp(
    theme: ThemeData(useMaterial3: false),
    routes: RouteWidget.mapRoutes({
      ...pageStateRoutes,
      ...pageUiBasicRoutes,
      ...pageConstraintRoutes,
      ...topRoutes,
      "/": (context) => homeWidget,
    }),
    initialRoute: "/constraint/intrinsticHeight_in_listview",
  ));
}
