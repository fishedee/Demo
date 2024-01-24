import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HttpDemo extends StatefulWidget {
  const HttpDemo({super.key});

  @override
  State<HttpDemo> createState() => _HttpDemo();
}

class _HttpDemo extends State<HttpDemo> {
  String content = "";

  Uint8List imageData = Uint8List(0);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Text(content),
          ElevatedButton(
            onPressed: onRequestGet,
            child: const Text("查看GET请求包"),
          ),
          ElevatedButton(
            onPressed: onRequestPostForm,
            child: const Text("查看POST FORM请求包"),
          ),
          ElevatedButton(
            onPressed: onRequestPostJson,
            child: const Text("查看POST JSON请求包"),
          ),
          ElevatedButton(
            onPressed: onRequestHostError,
            child: const Text("查看请求Host不存在"),
          ),
          ElevatedButton(
            onPressed: onRequestPathError,
            child: const Text("查看请求Path不存在"),
          ),
          Image.memory(imageData, fit: BoxFit.cover),
          ElevatedButton(
            onPressed: onDownloadFile,
            child: const Text("下载图片"),
          ),
          ElevatedButton(
            onPressed: onUploadFile,
            child: const Text("上传文件"),
          ),
        ],
      ),
    );
  }

  onRequestGet() async {
    Map<String, String> parameters = {
      'x': '3',
      'y': '4',
    };
    Uri uri = Uri.parse('http://httpbin.org/anything')
        .replace(queryParameters: parameters);
    final response = await http.get(
      uri,
    );
    content = response.body;
    setState(() {});
  }

  onRequestPostForm() async {
    Map<String, String> parameters = {
      'x': '3',
      'y': '4',
    };
    Uri uri = Uri.parse("").replace(queryParameters: parameters);

    final response = await http.post(
      Uri.parse('http://httpbin.org/anything'),
      headers: {
        'Content-Type':
            'application/x-www-form-urlencoded', // 指定请求的Content-Type为URL-encoded
      },
      body: uri.query,
    );
    content = response.body;
    setState(() {});
  }

  onRequestPostJson() async {
    Map<String, String> parameters = {
      'x': '3',
      'y': '4',
    };

    final response = await http.post(
      Uri.parse('http://httpbin.org/anything'),
      headers: {
        'Content-Type': 'application/json', // 指定请求的Content-Type为URL-encoded
      },
      body: jsonEncode(parameters),
    );
    content = response.body;
    setState(() {});
  }

  onRequestHostError() async {
    try {
      Map<String, String> parameters = {
        'x': '3',
        'y': '4',
      };

      final response = await http.post(
        Uri.parse('https://error_cc/'),
        headers: {
          'Content-Type': 'application/json', // 指定请求的Content-Type为URL-encoded
        },
        body: jsonEncode(parameters),
      );
      content = response.body;
      setState(() {});
    } on http.ClientException catch (e) {
      print('http.ClientException $e');
    } catch (e) {
      print('other exception $e');
    }
  }

  onRequestPathError() async {
    Map<String, String> parameters = {
      'x': '3',
      'y': '4',
    };

    final response = await http.post(
      Uri.parse('https://httpbin.org/ccc'),
      headers: {
        'Content-Type': 'application/json', // 指定请求的Content-Type为URL-encoded
      },
      body: jsonEncode(parameters),
    );
    content = response.body;
    print('statusCode ${response.statusCode}');
    setState(() {});
  }

  onDownloadFile() async {
    final response = await http.get(
      Uri.parse('https://httpbin.org/image/jpeg'),
    );
    imageData = response.bodyBytes;
    setState(() {});
  }

  onUploadFile() async {
    // 创建一个Multipart请求
    var request = http.MultipartRequest(
        'POST', Uri.parse("https://httpbin.org/anything"));

    // 添加文件到请求
    request.files.add(
      //直接指向文件
      //await http.MultipartFile('file', file.path),
      http.MultipartFile.fromBytes('file', imageData),
    );

    // 发送请求
    final response = await request.send();

    content = await response.stream.bytesToString();
    print('statusCode ${response.statusCode}');
    setState(() {});
  }
}
