//https://docs.flutter.dev/cookbook/lists/spaced-items
//这个看不懂，FIXME
//https://www.jianshu.com/p/347398d386cd
/*
LayoutBuilder(builder: (context, constraints) {
  return SingleChildScrollView(
    child: ConstrainedBox(
      constraints: BoxConstraints(minHeight: constraints.maxHeight),
      child: IntrinsicHeight(
        child: Column(
          children: [
            ItemWidget(text: 'Item 1'),
            Spacer(),
            ItemWidget(text: 'Item 2'),
            Expanded(
              child: ItemWidget(text: 'Item 3'),
            ),
          ],
        ),
      ),
    ),
  );
});
*/