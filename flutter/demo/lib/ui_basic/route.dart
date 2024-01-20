import 'package:demo/ui_basic/button.dart';
import 'package:demo/ui_basic/icon.dart';
import 'package:demo/ui_basic/image.dart';
import 'package:demo/ui_basic/text.dart';
import 'package:demo/ui_basic/textEditChangedAndSet.dart';
import 'package:demo/ui_basic/textEditFocus1.dart';
import 'package:demo/ui_basic/textEditFocus2.dart';
import 'package:demo/ui_basic/textEditStyle.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageUiBasicRoutes = {
  "/ui_basic/text": (context) => const TextDemo(),
  "/ui_basic/button": (context) => const ButtonDemo(),
  "/ui_basic/image": (context) => const ImageDemo(),
  "/ui_basic/icon": (context) => const IconDemo(),
  "/ui_basic/textEditStyle": (context) => const TextEditStyleDemo(),
  "/ui_basic/textEditChangedAndSet": (context) =>
      const TextEditChangedAndSetDemo(),
  "/ui_basic/textEditFocus1": (context) => TextEditFocus1(),
  "/ui_basic/textEditFocus2": (context) => TextEditFocus2(),
};
