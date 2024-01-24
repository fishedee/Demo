import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class RouteWidget extends StatelessWidget {
  final Map<String, WidgetBuilder> routes;
  const RouteWidget({
    required this.routes,
    Key? key,
  }) : super(key: key);

  static Map<String, WidgetBuilder> mapRoutes(
      Map<String, WidgetBuilder> routes) {
    Map<String, WidgetBuilder> result = {};
    for (final item in routes.entries) {
      final newBuilder = ((context) {
        final widget = item.value(context);
        return Scaffold(
          appBar: AppBar(title: Text(item.key)),
          body: widget,
        );
      });
      result[item.key] = newBuilder;
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> widgets = [];
    for (final route in routes.entries) {
      widgets.add(ElevatedButton(
          key: ValueKey(route.key),
          onPressed: () {
            Navigator.pushNamed(context, route.key);
          },
          child: Text(route.key)));
    }
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      child: Column(
        children: widgets,
      ),
    );
  }
}
