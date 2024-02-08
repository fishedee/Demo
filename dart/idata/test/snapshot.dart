import 'package:idata/idata.dart';
import 'package:test/test.dart';
import 'dart:io';
import 'dart:convert';
import 'package:test_api/src/backend/invoker.dart';
import "package:path/path.dart";

class SnapShotFile {
  Map<String, dynamic> data;

  String path;

  SnapShotFile({required this.data, required this.path});

  factory SnapShotFile.createFromFile(String path) {
    path = join(Directory.current.path, path);
    File file = File(path);
    String contents;
    // 读取文件内容
    try {
      contents = file.readAsStringSync();
    } catch (e) {
      return SnapShotFile(path: path, data: {});
    }
    if (contents.trim().isEmpty) {
      contents = '{}';
    }
    //转换json并且存起来
    dynamic info = jsonDecode(contents);
    if (info is! Map<String, dynamic>) {
      throw FormatException('文件：$path不是合法的json文件');
    }
    return SnapShotFile(path: path, data: info);
  }

  String _currentTestName = '';

  int _currentTestId = 0;

  void _refreshCurrentTest() async {
    //获取当前单元测试
    final testName = Invoker.current!.liveTest.test.name;
    if (testName != _currentTestName) {
      _currentTestName = testName;
      _currentTestId = 1;
    } else {
      _currentTestId++;
    }
  }

  void flush() {
    File file = File(path);
    if (file.existsSync()) {
      file.delete();
    }
    file.writeAsString(toStandardJson(data));
  }

  String toStandardJson(dynamic info) {
    final jsonEncoder = JsonEncoder.withIndent('  ');
    return jsonEncoder.convert(info);
  }

  void matchDynamicSnapShot(Object info) {
    String value = jsonEncode(DynamicEncode(info));
    matchSnapShot(value);
  }

  void matchSnapShot(String value) {
    _refreshCurrentTest();
    String key = '${_currentTestName}_$_currentTestId';
    dynamic newResultDynamic;
    try {
      newResultDynamic = jsonDecode(value);
    } catch (e) {
      throw FormatException("测试节点$key: [$value]的值不是合法的json");
    }
    final oldResultDynamic = data[key];
    if (oldResultDynamic == null) {
      data[key] = newResultDynamic;
      return;
    }
    final oldResult = toStandardJson(oldResultDynamic);
    final newResult = toStandardJson(newResultDynamic);
    expect(newResult, oldResult, reason: key);
  }
}

class SnapShotTest {
  Map<String, SnapShotFile> files = {};

  SnapShotFile _getSnapshotFile() {
    final testFile = Invoker.current!.liveTest.suite.path!;
    SnapShotFile? snapShot = files[testFile];
    if (snapShot == null) {
      snapShot = SnapShotFile.createFromFile('$testFile.json');
      files[testFile] = snapShot;
    }
    return snapShot;
  }

  void matchDynamicSnapShot(Map<String, dynamic> info) {
    final snapShot = _getSnapshotFile();
    snapShot.matchDynamicSnapShot(info);
  }

  void matchSnapShot(String value) {
    final snapShot = _getSnapshotFile();
    snapShot.matchSnapShot(value);
  }

  void flush() {
    files.forEach((key, file) {
      file.flush();
    });
  }
}
