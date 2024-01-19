import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';
import 'package:cached_network_image/cached_network_image.dart';

void main() {
  runApp(
    MaterialApp(
        theme: ThemeData(useMaterial3: false),
        home: const Scaffold(
          body: ImageDemo(),
        )),
  );
}

class ImageDemo extends StatelessWidget {
  const ImageDemo({
    Key? key,
  }) : super(key: key);

  final img = const AssetImage("assets/images/star.webp");

  List<Widget> _buildNetwork() {
    return [
      const Text("image load type..."),
      Image.network(
        "https://picsum.photos/250?image=9",
        width: 100.0,
      ),
      Image.asset(
        "assets/images/star.webp",
        width: 100.0,
      ),
      //占位图和淡入效果
      FadeInImage.memoryNetwork(
        placeholder: kTransparentImage,
        image: 'https://picsum.photos/250?image=9',
      ),
      //cachednetworkimage组件的缓存系统可以将图片缓存到内存和磁盘，并基于使用模式自动清理过期的缓存条目，
      CachedNetworkImage(
        placeholder: (context, url) => const CircularProgressIndicator(),
        imageUrl: 'https://picsum.photos/250?image=9',
      ),
    ];
  }

  List<Widget> _buildImageFill() {
    var widgets = [
      Image(
        image: img,
        height: 50.0,
        width: 100.0,
        fit: BoxFit.fill,
      ),
      Image(
        image: img,
        height: 50,
        width: 50.0,
        fit: BoxFit.contain,
      ),
      Image(
        image: img,
        width: 100.0,
        height: 50.0,
        fit: BoxFit.cover,
      ),
      Image(
        image: img,
        width: 100.0,
        height: 50.0,
        fit: BoxFit.fitWidth,
      ),
      Image(
        image: img,
        width: 100.0,
        height: 50.0,
        fit: BoxFit.fitHeight,
      ),
      Image(
        image: img,
        width: 100.0,
        height: 50.0,
        fit: BoxFit.scaleDown,
      ),
      Image(
        image: img,
        height: 50.0,
        width: 100.0,
        fit: BoxFit.none,
      ),
      Image(
        image: img,
        width: 100.0,
        color: Colors.blue,
        //颜色反色，高对比度
        colorBlendMode: BlendMode.difference,
        fit: BoxFit.fill,
      ),
      Image(
        image: img,
        width: 100.0,
        height: 200.0,
        repeat: ImageRepeat.repeatY,
      )
    ].map((e) {
      return Row(
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
                border: Border.all(width: 1, color: Colors.black)),
            margin: const EdgeInsets.all(16.0),
            child: SizedBox(
              width: 100,
              child: e,
            ),
          ),
          Text(e.fit.toString())
        ],
      );
    }).toList();
    return [const Text("image fit type..."), ...widgets];
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Column(children: [
      ..._buildNetwork(),
      ..._buildImageFill(),
    ]));
  }
}
