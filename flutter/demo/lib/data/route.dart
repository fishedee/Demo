import 'package:demo/data/computeIsolate.dart';
import 'package:demo/data/http.dart';
import 'package:demo/data/json.dart';
import 'package:demo/data/persistFile.dart';
import 'package:demo/data/persistKeyValue.dart';
import 'package:demo/data/persistSqlite.dart';
import 'package:demo/data/webSocket.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> pageDataRoutes = {
  "/data/http": (context) => const HttpDemo(),
  "/data/json": (context) => const JsonDemo(),
  "/data/persistKeyValue": (context) => const PersistKeyValueDemo(),
  "/data/persistFile": (context) => const PersistFileDemo(),
  "/data/persistSqlite": (context) => const PersistSqliteDemo(),
  "/data/computeIsolate": (context) => const ComputeIsolateDemo(),
  "/data/webSocket": (context) => const WebSocketDemo(),
};
