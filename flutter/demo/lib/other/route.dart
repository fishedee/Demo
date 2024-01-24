import 'package:demo/other/battery.dart';
import 'package:demo/other/errorReport.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageOtherRoutes = {
  "/other/battery": (context) => const BatteryDemo(),
  "/other/errorReport": (context) => const ErrorReportDemo(),
};
