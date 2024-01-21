import 'package:flutter/material.dart';

class TextEditStyleDemo extends StatelessWidget {
  const TextEditStyleDemo({
    Key? key,
  }) : super(key: key);

  List<Widget> _buildNormalTextField() {
    //边框样式
    const _outlineInputBorder = OutlineInputBorder(
      borderRadius: BorderRadius.zero,
      gapPadding: 0,
      borderSide: BorderSide(
        color: Colors.blue,
      ),
    );

    return [
      const TextField(
        autofocus: true,
        decoration: InputDecoration(
            labelText: "用户名",
            hintText: "用户名或邮箱",
            prefixIcon: Icon(Icons.person)),
      ),
      const TextField(
        decoration: InputDecoration(
            labelText: "密码", hintText: "您的登录密码", prefixIcon: Icon(Icons.lock)),
        //密码
        obscureText: true,
      ),
      const TextField(
        //仅输入数字的输入框，其他的还有
        //TextInputType.datetime
        //TextInputType.emailAddress
        keyboardType: TextInputType.number,
        decoration: InputDecoration(labelText: "年龄", hintText: "您的年龄"),
      ),
      TextField(
        //键盘的输入类型
        textInputAction: TextInputAction.search,
        decoration: const InputDecoration(labelText: "搜索", hintText: "查询"),
        onSubmitted: (data) {
          print('submit! ${data}');
        },
      ),
      const TextField(
        //多行文本
        maxLines: 3,
        decoration: InputDecoration(labelText: "内容"),
      ),
      const TextField(
        //自定义样式
        style: TextStyle(
          color: Colors.blue,
          fontSize: 18.0,
          //行高，是倍数，高度为fontSize*height
          height: 1.2,
          fontFamily: "Courier",
        ),
        decoration: InputDecoration(
          labelText: "手机",
          //labelStyle，未选中的时候，标签样式
          labelStyle: TextStyle(color: Colors.blue, fontSize: 15.0),
          //floatingLabelStyle，选中的时候，标签的样式
          floatingLabelStyle: TextStyle(color: Colors.pink, fontSize: 12.0),
          //图标和前缀文字
          prefixIcon: Icon(Icons.phone),
          prefixText: "+86",
          //placeholder的名称，选中为焦点的时候才会出现
          hintText: "请输入手机号码",
          hintStyle: TextStyle(color: Colors.purple, fontSize: 13.0),
          // 未获得焦点下划线设为黄色
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.yellow),
          ),
          //获得焦点下划线设为绿色
          focusedBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.green),
          ),
        ),
      ),
      const TextField(
          //常用样式配置
          style: TextStyle(
            color: Colors.red,
            fontSize: 15,
            height: 1,
          ),
          decoration: InputDecoration(
            fillColor: Colors.lightGreen, //背景颜色，必须结合filled: true,才有效
            filled: true, //重点，必须设置为true，fillColor才有效
            isCollapsed: true, //重点，相当于高度包裹的意思，必须设置为true，不然有默认奇妙的最小高度
            contentPadding:
                EdgeInsets.symmetric(vertical: 0, horizontal: 0), //内容内边距，影响高度
            hintText: "电子邮件地址",
            border: _outlineInputBorder,
            focusedBorder: _outlineInputBorder,
            enabledBorder: _outlineInputBorder,
            disabledBorder: _outlineInputBorder,
            errorBorder: _outlineInputBorder,
            focusedErrorBorder: _outlineInputBorder,
          ))
    ];
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Column(children: [
      ..._buildNormalTextField(),
    ]));
  }
}
