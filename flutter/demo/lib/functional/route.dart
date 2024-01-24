import 'package:demo/functional/builder.dart';
import 'package:demo/functional/dialog.dart';
import 'package:demo/functional/popScope.dart';
import 'package:demo/functional/provider.dart';
import 'package:demo/functional/valueListenable.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageFunctionalRoutes = {
  "/functional/popScope": (context) => const PopScopeDemo(),
  "/functional/provider": (context) => const ProviderDemo(),
  "/functional/builder": (context) => const BuilderDemo(),
  "/functional/valueListenable": (context) => const ValueListenableDemo(),
  "/functional/dialog": (context) => const DialogDemo(),
};
