import 'package:demo/container/clip.dart';
import 'package:demo/container/container.dart';
import 'package:demo/container/decorateBox.dart';
import 'package:demo/container/fittedBox.dart';
import 'package:demo/container/padding.dart';
import 'package:demo/container/transform.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageContainerRoutes = {
  "/container/padding": (context) => const PaddingDemo(),
  "/container/decorateBox": (context) => const DecorateBoxDemo(),
  "/container/transform": (context) => const TransformDemo(),
  "/container/container": (context) => const ContainerDemo(),
  "/container/clip": (context) => const ClipDemo(),
  "/container/fittedBox": (context) => const FittedBoxDemo(),
};
