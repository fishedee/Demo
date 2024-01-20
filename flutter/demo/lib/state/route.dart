import 'package:demo/state/basic5_2_reuseStateLocalKey.dart';
import 'package:demo/state/basic6_1_missStateGlobalKey.dart';
import 'package:demo/state/basic6_2_reuseStateGloalKey.dart';
import 'package:demo/state/basic7_1_buildSubTreeDefault.dart';
import 'package:demo/state/basic7_2_avoidBuildSubTreeByCacheWidget.dart';
import 'package:flutter/material.dart';

import './basic1.dart';
import './basic2_stateless.dart';
import './basic3_stateful.dart';
import './basic4_reuseStateWhenWidgetIsSameLevel.dart';
import './basic5_1_missStateLocalKey.dart';

Map<String, WidgetBuilder> pageStateRoutes = {
  "/state/basic1": (context) => const BasicWidget(),
  "/state/basic2": (context) => const BasicWidget2(),
  "/state/basic3": (context) => const BasicWidget3(),
  "/state/basic4": (context) => const BasicWidget4(),
  "/state/basic5_1": (context) => const BasicWidget5_1(),
  "/state/basic5_2": (context) => const BasicWidget5_2(),
  "/state/basic6_1": (context) => const BasicWidget6_1(),
  "/state/basic6_2": (context) => const BasicWidget6_2(),
  "/state/basic7_1": (context) => const BasicWidget7_1(),
  "/state/basic7_2": (context) => const BasicWidget7_2(),
};
