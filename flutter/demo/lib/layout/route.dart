import 'package:demo/layout/constraintBox.dart';
import 'package:demo/layout/flow.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageLayoutRoutes = {
  "/layout/constraintBox": (context) => const ConstraintBoxDemo(),
  "/layout/flow": (context) => const ExampleParallax(),
};
