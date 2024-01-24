import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:decimal/decimal.dart';

//part的名称必须与当前文件一致的
part 'json.g.dart';

//dart run build_runner build --delete-conflicting-outputs
//dart run build_runner watch --delete-conflicting-outputs

@JsonSerializable()
class Address {
  String? street;
  String city;

  Address(this.street, this.city);

  factory Address.fromJson(Map<String, dynamic> json) =>
      _$AddressFromJson(json);
  Map<String, dynamic> toJson() => _$AddressToJson(this);
}

@JsonSerializable()
class Item {
  int id;

  Decimal amount;

  Decimal? price;

  Item(this.id, this.amount, this.price);

  factory Item.fromJson(Map<String, dynamic> json) => _$ItemFromJson(json);
  Map<String, dynamic> toJson() => _$ItemToJson(this);
}

@JsonSerializable(explicitToJson: true)
class User {
  User(this.name, this.address, this.items, this.color);

  String name;
  Address? address;

  Color? color;

  List<Item> items;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

enum Color {
  red('红色'),
  green('绿色'),
  blue('蓝色');

  //构造函数必须是const的，因此成员变量也必须是final的
  final String label;
  const Color(this.label);

  @override
  String toString() {
    //每个枚举都有一个index
    return 'color:$label, index $index';
  }
}

testBasic() {
  var input = '''
{
  "name":"fish",
  "address":{
    "street":"st1",
    "city":"mc"
  },
  "items":[
    {
      "id":1,
      "amount":"123",
      "price":"34.12"
    },
     {
      "id":2,
      "amount":"123"
    }
  ],
  "color":"blue"
}
''';
  final input2 = jsonDecode(input) as Map<String, dynamic>;
  final user = User.fromJson(input2);
  print('user ${user.toJson()}');
  String output = jsonEncode(user);
  print('user output [$output]');
}

testEmpty() {
  var input = '''
{
  "address":{
    "street":"st1",
    "city":"mc"
  },
  "items":[
  ]
}
''';
  try {
    final input2 = jsonDecode(input) as Map<String, dynamic>;
    final user = User.fromJson(input2);
    print('user ${user.toJson()}');
  } catch (e, s) {
    print('username is null,so fail! $e,$s');
  }
}

testStringCanNotAsNum() {
  var input = '''
{
  "name":"cat",
  "items":[
      {
        "id":"123",
        "amount":"456"
      }
  ]
}
''';
  try {
    final input2 = jsonDecode(input) as Map<String, dynamic>;
    final user = User.fromJson(input2);
    print('user ${user.toJson()}');
  } catch (e, s) {
    print('id "123" is not int,so fail! $e,$s');
  }
}

testEnumIsNotExist() {
  var input = '''
{
  "name":"cat",
  "color":"yellow",
  "items":[
  ]
}
''';
  try {
    final input2 = jsonDecode(input) as Map<String, dynamic>;
    final user = User.fromJson(input2);
    print('user ${user.toJson()}');
  } catch (e, s) {
    print('color [yellow] is not exist,so fail! $e,$s');
  }
}

class JsonDemo extends StatelessWidget {
  const JsonDemo({super.key});

  test() {
    testBasic();
    testEmpty();
    testEnumIsNotExist();
    testStringCanNotAsNum();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      ElevatedButton(
        onPressed: test,
        child: const Text('点我试试'),
      )
    ]);
  }
}
