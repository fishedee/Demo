import 'package:demo/routeWidget.dart';
import 'package:demo/ui_basic/route.dart';
import 'package:flutter/material.dart';
import 'state/route.dart';

Map<String, WidgetBuilder> topRoutes = {
  '/state': (context) => RouteWidget(routes: pageStateRoutes),
  '/ui_basic': (context) => RouteWidget(routes: pageUiBasicRoutes)
};

Widget homeWidget = RouteWidget(routes: topRoutes);

void main() {
  runApp(MaterialApp(
    theme: ThemeData(useMaterial3: false),
    routes: RouteWidget.mapRoutes({
      ...pageStateRoutes,
      ...pageUiBasicRoutes,
      ...topRoutes,
      "/": (context) => homeWidget,
    }),
    initialRoute: "/",
  ));
}
