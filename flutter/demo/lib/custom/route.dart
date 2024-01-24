import 'package:demo/custom/CustomPaint.dart';
import 'package:demo/custom/CustomPaintWidget.dart';
import 'package:demo/custom/CustomWidget.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageCustomRoutes = {
  "/custom/customWidget": (context) => const CustomWidgetDemo(),
  "/custom/customPaint": (context) => const CustomPaintDemo(),
  "/custom/customPaintWidget": (context) => const CustomPaintWidgetDemo(),
};
