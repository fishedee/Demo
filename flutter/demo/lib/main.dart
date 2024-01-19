import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';
import 'package:cached_network_image/cached_network_image.dart';

void main() {
  runApp(
    MaterialApp(
        theme: ThemeData(useMaterial3: false),
        home: const Scaffold(
          body: SafeArea(child: IconDemo()),
        )),
  );
}

class IconDemo extends StatelessWidget {
  const IconDemo({
    Key? key,
  }) : super(key: key);

  Widget _buildMaterialIcon() {
    //https://material.io/tools/icons/，在这里可以查到所有的Material icon
    String icons = "";
    // accessible: 0xe03e
    icons += "\uE03e";
    // error:  0xe237
    icons += " \uE237";
    // fingerprint: 0xe287
    icons += " \uE287";

    return Text(icons,
        style: const TextStyle(
          fontFamily: "MaterialIcons",
          fontSize: 24.0,
          color: Colors.green,
        ));
  }

  Widget _buildMaterialIcon2() {
    return const Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Icon(Icons.accessible, color: Colors.green),
        Icon(Icons.error, color: Colors.green),
        Icon(Icons.fingerprint, color: Colors.green),
        Text("icon2"),
      ],
    );
  }

  // book 图标
  final IconData like =
      const IconData(0xe61d, fontFamily: 'myIcon', matchTextDirection: true);
  // 微信图标
  final IconData home =
      const IconData(0xe61e, fontFamily: 'myIcon', matchTextDirection: true);

  Widget _buildMyIcon() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Icon(like, color: Colors.green),
        Icon(home, color: Colors.green),
        const Text("myIcon3"),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Column(children: [
      _buildMaterialIcon(),
      _buildMaterialIcon2(),
      _buildMyIcon(),
    ]));
  }
}
