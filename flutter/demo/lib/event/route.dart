import 'package:demo/event/gestureDetectorDrag.dart';
import 'package:demo/event/gestureDetectorScale.dart';
import 'package:demo/event/gestureDetectorTap.dart';
import 'package:demo/event/gestureRecognizer.dart';
import 'package:demo/event/listerner.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageEventRoutes = {
  "/event/listener": (context) => const ListenerDemo(),
  "/event/gestureDetectorTap": (context) => const GestureDetectorTapDemo(),
  "/event/gestureDetectorDrag": (context) => const GestureDetectorDragDemo(),
  "/event/gestureDetectorScale": (context) => const GestureDetectorScaleDemo(),
  "/event/gestureRecognizer": (context) => const GestureRecognizerDemo(),
};
