import 'package:flutter/material.dart';

class TextEditChangedAndSetDemo extends StatelessWidget {
  const TextEditChangedAndSetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Retrieve Text Input',
      home: Scaffold(body: SafeArea(child: MyCustomForm())),
    );
  }
}

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

class _MyCustomFormState extends State<MyCustomForm> {
  final myController = TextEditingController();

  @override
  void initState() {
    super.initState();
    myController.addListener(_printLatestValue);
  }

  @override
  void dispose() {
    myController.dispose();
    super.dispose();
  }

  void _printLatestValue() {
    final text = myController.text;
    print('Second text field: $text (${text.characters.length})');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Retrieve Text Input'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              onChanged: (text) {
                print('First text field: $text (${text.characters.length})');
              },
            ),
            TextField(
              controller: myController,
            ),
            ElevatedButton(
              child: const Text('设置第二个TextField'),
              onPressed: () {
                //设置默认值，并从第三个字符开始选中后面的字符
                myController.text = "hello world!";
                myController.selection = TextSelection(
                    baseOffset: 2, extentOffset: myController.text.length);
              },
            )
          ],
        ),
      ),
    );
  }
}
