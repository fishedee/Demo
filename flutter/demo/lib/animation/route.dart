import 'package:demo/animation/animationSwitcher.dart';
import 'package:demo/animation/animationSwitcher2.dart';
import 'package:demo/animation/simulationAnimation.dart';
import 'package:demo/animation/staggerAnimation.dart';
import 'package:demo/animation/staggerAnimation2.dart';
import 'package:demo/animation/autoListen.dart';
import 'package:demo/animation/autoListen2.dart';
import 'package:demo/animation/heroBasic.dart';
import 'package:demo/animation/heroRadial.dart';
import 'package:demo/animation/implicitAnimation.dart';
import 'package:demo/animation/implicitAnimation2.dart';
import 'package:demo/animation/manualListen.dart';
import 'package:demo/animation/pageAnimation.dart';
import 'package:demo/animation/statusListen.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageAnimationRoutes = {
  "/animation/manualListen": (context) => const AnimationManualListenDemo(),
  "/animation/autoListen": (context) => const AnimationAutoListenDemo(),
  "/animation/autoListen2": (context) => const AnimationAutoListenDemo2(),
  "/animation/statusListen": (context) => const AnimationStatusListenDemo(),
  "/animation/pageAnimation": (context) => const PageAnimationDemo(),
  "/animation/implicitAnimation": (context) => const ImplicitAnimationDemo(),
  "/animation/implicitAnimation2": (context) => const ImplicitAnimationDemo2(),
  "/animation/heroBasic": (context) => const HeroBasicDemo(),
  "/animation/heroRadial": (context) => const HeroRadialDemo(),
  "/animation/staggerAnimation": (context) => const StaggerAnimationDemo(),
  "/animation/staggerAnimation2": (context) => const StaggerAnimationDemo2(),
  "/animation/simulationAnimation": (context) =>
      const SimulationAnimationDemo(),
  "/animation/animationSwitcher": (context) => const AnimationSwitcherDemo(),
  "/animation/animationSwitcher2": (context) => const AnimationSwitcherDemo2(),
};
