import 'package:idata/idata.dart';
import 'package:test/test.dart';
import './snapshot.dart';
import 'dart:convert';

final snapShopTest = SnapShotTest();

class TestUtil<T> {
  final Object? Function(T? data) toDynamic;

  final T? Function(Object? data) fromDynamic;

  TestUtil({required this.toDynamic, required this.fromDynamic});

  testFromJson(Object? data) {
    final result = <String, dynamic>{};
    result['input'] = data;
    try {
      final info = fromDynamic(data);
      result['data'] = info;
    } catch (e) {
      result['error'] = e.toString();
    }
    snapShopTest.matchDynamicSnapShot(result);
  }

  String toJson(T? data) {
    Object? dynamicValue = toDynamic(data);
    return jsonEncode(dynamicValue);
  }

  T? fromJson(String data) {
    Object? dynamicValue = jsonDecode(data);
    return fromDynamic(dynamicValue);
  }

  testToAndFromJson(T? data) {
    final result = <String, dynamic>{};
    String json = toJson(data);
    T? data2 = fromJson(json);
    String json2 = toJson(data2);
    expect(json, json2);
    expect(data.toString(), data2.toString());
    result["json"] = data2;
    snapShopTest.matchDynamicSnapShot(result);
  }
}

void main() {
  tearDownAll(() async {
    snapShopTest.flush();
  });

  test('int', () {
    final testUtil = TestUtil(
        fromDynamic: IntHelper.fromDynamic, toDynamic: IntHelper.toDynamic);
    testUtil.testFromJson(null);
    testUtil.testFromJson(123);
    testUtil.testFromJson(123.6);
    testUtil.testFromJson('123');
    testUtil.testFromJson('ccd');
  });

  test('bool', () {
    final testUtil = TestUtil(
        fromDynamic: BoolHelper.fromDynamic, toDynamic: BoolHelper.toDynamic);
    testUtil.testFromJson(null);
    testUtil.testFromJson(true);
    testUtil.testFromJson(false);
    testUtil.testFromJson('true');
    testUtil.testFromJson('false');
    testUtil.testFromJson(123);
    testUtil.testFromJson(2.3);
  });

  test('double', () {
    final testUtil = TestUtil(
        fromDynamic: DoubleHelper.fromDynamic,
        toDynamic: DoubleHelper.toDynamic);
    testUtil.testFromJson(null);
    testUtil.testFromJson(123);
    testUtil.testFromJson(123.6);
    testUtil.testFromJson('23.4');
    testUtil.testFromJson('2cc');
  });

  test('string', () {
    final testUtil = TestUtil(
        fromDynamic: StringHelper.fromDynamic,
        toDynamic: StringHelper.toDynamic);
    testUtil.testFromJson(null);
    testUtil.testFromJson(true);
    testUtil.testFromJson(123);
    testUtil.testFromJson(123.6);
    testUtil.testFromJson('23.4');
    testUtil.testFromJson('2cc');
  });

  test('user', () {
    final testUtil =
        TestUtil(fromDynamic: User.fromDynamic, toDynamic: User.toDynamic);
    testUtil.testToAndFromJson(null);
    testUtil.testToAndFromJson(User());
    testUtil.testToAndFromJson(User(id: 1, name: 'cc'));
    testUtil.testToAndFromJson(User(id: 2, isVip: true));
    testUtil.testToAndFromJson(User(id: 2, isVip: true, type: UserType.ADMIN));
  });

  test('country', () {
    final testUtil = TestUtil(
        fromDynamic: Country.fromDynamic, toDynamic: Country.toDynamic);
    testUtil.testToAndFromJson(null);
    testUtil.testToAndFromJson(Country());
    testUtil.testToAndFromJson(Country(id: 1));
    testUtil.testToAndFromJson(Country(users: List.empty()));
    testUtil.testToAndFromJson(Country(id: 2, users: [
      User(id: 1, name: 'cc'),
      User(isVip: true),
    ]));
  });

  test('department', () {
    final testUtil = TestUtil(
        fromDynamic: Department.fromDynamic, toDynamic: Department.toDynamic);
    testUtil.testToAndFromJson(null);
    testUtil.testToAndFromJson(Department());
    testUtil.testToAndFromJson(Department(
      id: 1,
      manager: User(id: 2, name: 'fish'),
    ));
    testUtil.testToAndFromJson(Department(
      id: 2,
      colors: [
        [1, 2, 3],
        [3, 4, 5],
      ],
    ));
    testUtil.testToAndFromJson(Department(
      id: 3,
      peoples: {
        'cc': User(id: 1, name: 'cc'),
        'c2': User(isVip: false),
      },
    ));
  });

  test('apiInt', () {
    final result = ApiAddUserInfo();
    snapShopTest.matchDynamicSnapShot({
      "data": result,
    });
  });

  test('apiUserList', () {
    final result = ApiGetAllUserInfo(
      [
        User(id: 3, name: "cc"),
        User(id: 4, isVip: true, type: UserType.ADMIN),
      ],
    );
    snapShopTest.matchDynamicSnapShot({
      "data": result?.map((single) => single.encodeDynamic()).toList(),
    });
  });
}
