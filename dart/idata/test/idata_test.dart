import 'package:idata/idata.dart';
import 'package:test/test.dart';

void testBasic() {
  test('test int ', () {
    var result = IntHelper.fromJson('123');
    expect(result, 123);
  });
}

void main() {
  test('calculate', () {
    expect(calculate(), 42);
  });
}
