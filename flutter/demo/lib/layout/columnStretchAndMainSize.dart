import 'package:flutter/material.dart';

class ColumnStretchAndMainSizeDemo extends StatelessWidget {
  const ColumnStretchAndMainSizeDemo({
    Key? key,
  }) : super(key: key);

  Widget _buildColumn_mainAxisSize_min() {
    return SizedBox(
      width: 300,
      height: 300,
      child: Container(
          padding: const EdgeInsets.all(16.0),
          color: const Color(0xffdddddd),
          child: Align(
            alignment: Alignment.topLeft,
            child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.red, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  //maxAxisSize仅当它是loose约束才有效
                  //默认值是min，也就是取子控件的宽高的合并
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Container(
                      color: Colors.green,
                      child: const Column(
                        children: <Widget>[
                          Text("hello world "),
                          Text("I am Jack "),
                        ],
                      ),
                    )
                  ],
                )),
          )),
    );
  }

  Widget _buildColumn_mainAxisSize_max() {
    return SizedBox(
      width: 300,
      height: 300,
      child: Container(
          padding: const EdgeInsets.all(16.0),
          color: const Color(0xffdddddd),
          child: Align(
            alignment: Alignment.topLeft,
            child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.red, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  //maxAxisSize仅当它是loose约束才有效
                  //当取max的时候，就是取maxHeight，也就是取父控件的高度
                  mainAxisSize: MainAxisSize.max,
                  children: <Widget>[
                    Container(
                      color: Colors.green,
                      child: const Column(
                        children: <Widget>[
                          Text("hello world "),
                          Text("I am Jack "),
                        ],
                      ),
                    )
                  ],
                )),
          )),
    );
  }

  Widget _buildColumn_mainAxisSize_sub_max() {
    return SizedBox(
      width: 300,
      height: 300,
      child: Container(
          padding: const EdgeInsets.all(16.0),
          color: const Color(0xffdddddd),
          child: Align(
            alignment: Alignment.topLeft,
            child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.red, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: <Widget>[
                    Container(
                      color: Colors.green,
                      child: const Column(
                        //Column下面的子Column取max是没有用的，因为row/column下面的约束是Unbounded的，maxHeight = 无穷
                        //子控件，无法使用MainAxisSize.max，只能取子控件的最大值
                        mainAxisSize: MainAxisSize.max,
                        children: <Widget>[
                          Text("hello world "),
                          Text("I am Jack "),
                        ],
                      ),
                    )
                  ],
                )),
          )),
    );
  }

  Widget _buildColumn_mainAxisSize_sub_max_fix() {
    return SizedBox(
      width: 300,
      height: 300,
      child: Container(
          padding: const EdgeInsets.all(16.0),
          color: const Color(0xffdddddd),
          child: Align(
            alignment: Alignment.topLeft,
            child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.red, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: <Widget>[
                    //一个简单的办法就是：
                    //Column下面的子Column放在Expanded里面，会得到tight约束，高度就是父Column的高度
                    //子控件，无需使用MainAxisSize.max，因为height是tight约束，无法更改的。
                    Expanded(
                        child: Container(
                      color: Colors.green,
                      child: const Column(
                        children: <Widget>[
                          Text("hello world "),
                          Text("I am Jack "),
                        ],
                      ),
                    ))
                  ],
                )),
          )),
    );
  }

  Widget _buildColumn_mainAxisSize_sub_max_fix2() {
    return SizedBox(
      width: 300,
      height: 300,
      child: Container(
          padding: const EdgeInsets.all(16.0),
          color: const Color(0xffdddddd),
          child: Align(
            alignment: Alignment.topLeft,
            child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.red, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: <Widget>[
                    //另外一个办法就是：
                    //Column下面的子Column放在Expanded里面，会得到tight约束，
                    //同时使用Align，将tight约束转换为loose约束
                    //这个时候的子Column就可以使用MainAxisSize.max/MainAxisSize.min来控制自身的高度
                    //这种方法很少用，甚至没有必要，仅仅是演示效果而已。
                    Expanded(
                        child: Align(
                            //注意，没有widthFactor，没有heightFactor的时候，宽高取父的宽高。存在的时候，取子宽高的比例放大。
                            widthFactor: 1,
                            heightFactor: 1,
                            alignment: Alignment.topLeft,
                            child: Container(
                              color: Colors.green,
                              child: const Column(
                                mainAxisSize: MainAxisSize.max,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: <Widget>[
                                  Text("hello world "),
                                  Text("I am Jack "),
                                ],
                              ),
                            )))
                  ],
                )),
          )),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Column(
      children: [
        _buildColumn_mainAxisSize_min(),
        const SizedBox(height: 20),
        _buildColumn_mainAxisSize_max(),
        const SizedBox(height: 20),
        _buildColumn_mainAxisSize_sub_max(),
        const SizedBox(height: 20),
        _buildColumn_mainAxisSize_sub_max_fix(),
        const SizedBox(height: 20),
        _buildColumn_mainAxisSize_sub_max_fix2(),
      ],
    ));
  }
}
