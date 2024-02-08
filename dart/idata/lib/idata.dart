import 'package:idata/request.dart';

/*
* 设计目标
* 1. 支持后端Api升级以后，前端需要往后兼容新后端Api。包括，支持没有预定义的Enum，支持没有预定义的字段保存和透传
* 2. 最大化兼容不同格式的后端格式，例如以string来传递int，double或者bool字段
* 3. 数据不仅用来后端传递数据，也是前端表单的数据模型。所以，每个字段都需要允许为null，以保存用户暂时未填写的表单项
* 4. 前端表单的数据模型，需要为强类型的，避免在编写业务逻辑代码中使用不存在的字段，传入不匹配的类型。
* 5. 前端表单的数据模型，需要获取模型的field所有可能性，以保证在编译时进行校验field是否存在。
*/
abstract interface class IData {
  Object? operator [](String name);
  void operator []=(String name, Object? value);
}

abstract interface class IDataDynamic {
  Object encodeDynamic();
}

class BoolHelper {
  static bool? fromDynamic(Object? data) {
    if (data == null) {
      return null;
    } else if (data is bool) {
      return data;
    } else if (data is String) {
      if (data.trim().toLowerCase() == 'true') {
        return true;
      } else if (data.trim().toLowerCase() == 'false') {
        return false;
      }
    }
    throw FormatException('can not parse to bool: [$data]');
  }

  static Object? toDynamic(bool? data) {
    return data;
  }
}

class IntHelper {
  static int? fromDynamic(Object? data) {
    if (data == null) {
      return null;
    } else if (data is int) {
      return data;
    } else if (data is double) {
      return data.toInt();
    } else if (data is String) {
      return int.parse(data);
    }
    throw FormatException("can not parse to int: [$data]");
  }

  static Object? toDynamic(int? data) {
    return data;
  }
}

class DoubleHelper {
  static double? fromDynamic(Object? data) {
    if (data == null) {
      return null;
    } else if (data is int) {
      return data.toDouble();
    } else if (data is double) {
      return data;
    } else if (data is String) {
      return double.parse(data);
    }
    throw FormatException('can not parse to double: [$data]');
  }

  static Object? toDynamic(double? data) {
    return data;
  }
}

class StringHelper {
  static String? fromDynamic(Object? data) {
    if (data == null) {
      return null;
    } else if (data is String ||
        data is int ||
        data is double ||
        data is String ||
        data is bool) {
      return data.toString();
    }
    throw FormatException('can not parse to String: [$data]');
  }

  static Object? toDynamic(String? data) {
    return data;
  }
}

class ListHelper {
  static List<T>? Function(Object? data) wrapFromDynamic<T>(
      T Function(Object? item) fromDynamicItem) {
    return (Object? data) {
      if (data == null) {
        return null;
      } else if (data is List) {
        return data.map((single) => fromDynamicItem(single)).toList();
      }
      throw FormatException('can not parse to list: [$data]');
    };
  }

  static Object? Function(List<T>? data) wrapToDynamic<T>(
      Object Function(T data) toDynamicItem) {
    return (List<T>? data) {
      if (data == null) {
        return null;
      }
      return data.map((single) => toDynamicItem(single)).toList();
    };
  }

  static bool equals<T>(List<T>? a, List<T>? b) {
    if (a == null) return b == null;
    if (b == null || a.length != b.length) return false;

    /// Check whether two references are to the same object.
    if (identical(a, b)) return true;
    for (var i = 0; i != a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
}

class MapHelper {
  static Map<String, T>? Function(Object? data) wrapFromDynamic<T>(
      T Function(Object? item) fromDynamicItem) {
    return (Object? data) {
      if (data == null) {
        return null;
      } else if (data is Map<String, Object?>) {
        final result = <String, T>{};
        data.forEach((key, value) {
          result[key] = fromDynamicItem(value);
        });
        return result;
      }
      throw FormatException('can not parse to map: [$data]');
    };
  }

  static Object? Function(Map<String, T>? data) wrapToDynamic<T>(
      Object Function(T data) toDynamicItem) {
    return (Map<String, T>? data) {
      if (data == null) {
        return null;
      }
      final result = <String, dynamic>{};
      data.forEach((key, value) {
        result[key] = toDynamicItem(value);
      });
      return result;
    };
  }

  static bool equals<T, U>(Map<T, U>? a, Map<T, U>? b) {
    if (a == null) return b == null;
    if (b == null || a.length != b.length) return false;

    /// Check whether two references are to the same object.
    if (identical(a, b)) return true;
    for (final T key in a.keys) {
      if (!b.containsKey(key) || b[key] != a[key]) {
        return false;
      }
    }
    return true;
  }
}

class IDataEnum {
  final String value;

  final String label;

  const IDataEnum(this.value, this.label);

  @override
  int get hashCode {
    return value.hashCode;
  }

  @override
  bool operator ==(Object? other) {
    return other is IDataEnum &&
        runtimeType == other.runtimeType &&
        value == other.value;
  }

  @override
  String toString() {
    return '$runtimeType($value-$label)';
  }
}

class UserType extends IDataEnum implements IDataDynamic {
  static const ADMIN = UserType('ADMIN', '管理员');

  static const NORMAL = UserType('NORMAL', '普通人员');

  const UserType(super.value, super.label);

  static UserType? fromDynamic(Object? data) {
    if (data == null) {
      return null;
    } else if (data is String) {
      return UserType(data, data);
    }
    throw FormatException('can not parse to UserType: [$data]');
  }

  static Object? toDynamic(UserType? result) {
    if (result == null) {
      return null;
    } else {
      return result.value;
    }
  }

  @override
  Object encodeDynamic() {
    return toDynamic(this)!;
  }

  static List<UserType> values() {
    return [ADMIN, NORMAL];
  }
}

typedef GetterHandler<T> = Object? Function(T data);
typedef SetterHandler<T> = void Function(T data, Object? value);
typedef ToDynamicHandler<T> = Object? Function(T data);
typedef FromDynamicHandler<T> = void Function(T data, Object? value);
typedef FieldReflectInfo<T> = Map<
    String,
    ({
      GetterHandler<T> getter,
      SetterHandler<T> setter,
      ToDynamicHandler<T> toDynamic,
      FromDynamicHandler<T> fromDynamic
    })>;

abstract class IDataBasic implements IData {
  final Map<String, Object?> _externalFields = {};

  IDataBasic();

  Map<String, Object?> getExternalFields() {
    return _externalFields;
  }

  Object? getExternalField(String name) {
    return _externalFields[name];
  }

  @override
  Object? operator [](String name) {
    return _externalFields[name];
  }

  void setExternalField(String name, Object? value) {
    _externalFields[name] = value;
  }

  @override
  void operator []=(String name, Object? value) {
    _externalFields[name] = value;
  }
}

class IDataField {
  final String key;

  const IDataField(this.key);
}

class UserField extends IDataField {
  static const UserField id = UserField("id");

  static const UserField name = UserField("name");

  static const UserField isVip = UserField("isVip");

  const UserField(super.key);
}

class User extends IDataBasic implements IDataDynamic {
  static final FieldReflectInfo<User> _fields = {
    "id": (
      getter: (data) => data._id,
      setter: (data, value) => data._id = value as int?,
      toDynamic: (data) {
        final formatter = IntHelper.toDynamic;
        return formatter(data._id);
      },
      fromDynamic: (data, value) {
        final parser = IntHelper.fromDynamic;
        data._id = parser(value);
      }
    ),
    "type": (
      getter: (data) => data._type,
      setter: (data, value) => data._type = value as UserType?,
      toDynamic: (data) {
        final formatter = UserType.toDynamic;
        return formatter(data._type);
      },
      fromDynamic: (data, value) {
        final parser = UserType.fromDynamic;
        data._type = parser(value);
      }
    ),
    "name": (
      getter: (data) => data._name,
      setter: (data, value) => data._name = value as String?,
      toDynamic: (data) {
        final formatter = StringHelper.toDynamic;
        return formatter(data._name);
      },
      fromDynamic: (data, value) {
        final parser = StringHelper.fromDynamic;
        data._name = parser(value);
      }
    ),
    "isVip": (
      getter: (data) => data._isVip,
      setter: (data, value) => data._isVip = value as bool?,
      toDynamic: (data) {
        final formatter = BoolHelper.toDynamic;
        return formatter(data._isVip);
      },
      fromDynamic: (data, value) {
        final parser = BoolHelper.fromDynamic;
        data._isVip = parser(value);
      }
    ),
  };

  User({int? id, String? name, bool? isVip, UserType? type})
      : _id = id,
        _name = name,
        _isVip = isVip,
        _type = type;

  static User? fromDynamic(Object? dy) {
    if (dy == null) {
      return null;
    } else if (dy is Map<String, dynamic>) {
      final user = User();
      dy.forEach((key, dynamicValue) {
        final fieldInfo = _fields[key];
        if (fieldInfo == null) {
          user.setExternalField(key, dynamicValue);
          return;
        }
        fieldInfo.fromDynamic(user, dynamicValue);
      });
      return user;
    }
    throw FormatException('can not parse to user: [$dy]');
  }

  static Map<String, dynamic>? toDynamic(User? data) {
    if (data == null) {
      return null;
    }
    final result = <String, dynamic>{};
    data.getExternalFields().forEach((key, value) {
      if (value != null) {
        result[key] = value;
      }
    });
    _fields.forEach((key, fieldInfo) {
      final dynamicValue = fieldInfo.toDynamic(data);
      if (dynamicValue != null) {
        result[key] = dynamicValue;
      }
    });
    return result;
  }

  @override
  Map<String, dynamic> encodeDynamic() {
    return toDynamic(this)!;
  }

  @override
  String toString() {
    return encodeDynamic().toString();
  }

  @override
  Object? operator [](String name) {
    var fieldInfo = _fields[name];
    if (fieldInfo == null) {
      return super[name];
    }
    return fieldInfo.getter(this);
  }

  @override
  void operator []=(String name, Object? value) {
    var fieldInfo = _fields[name];
    if (fieldInfo == null) {
      super[name] = value;
      return;
    }
    fieldInfo.setter(this, value);
  }

  int? _id;

  int get id {
    return _id!;
  }

  int? getId() {
    return _id;
  }

  set id(int data) {
    _id = data;
  }

  void setId(int? data) {
    _id = data;
  }

  UserType? _type;

  UserType get type {
    return _type!;
  }

  UserType? getType() {
    return _type;
  }

  set type(UserType data) {
    _type = data;
  }

  void setType(UserType? data) {
    _type = data;
  }

  String? _name;

  String get name {
    return _name!;
  }

  String? getName() {
    return _name;
  }

  set name(String data) {
    _name = data;
  }

  setName(String? data) {
    _name = data;
  }

  bool? _isVip;

  bool get isVip {
    return _isVip!;
  }

  bool? getIsVip() {
    return _isVip;
  }

  set isVip(bool data) {
    _isVip = data;
  }

  setIsVip(bool? data) {
    _isVip = data;
  }
}

class CountryField extends IDataField {
  static const CountryField id = CountryField("id");

  static const CountryField users = CountryField("users");

  const CountryField(super.key);
}

class Country extends IDataBasic implements IDataDynamic {
  static final FieldReflectInfo<Country> _fields = {
    "id": (
      getter: (data) => data._id,
      setter: (data, value) => data._id = value as int?,
      toDynamic: (data) {
        final formatter = IntHelper.toDynamic;
        return formatter(data._id);
      },
      fromDynamic: (data, value) {
        final parser = IntHelper.fromDynamic;
        data._id = parser(value);
      }
    ),
    "users": (
      getter: (data) => data._users,
      setter: (data, value) => data._users = value as List<User>?,
      toDynamic: (data) {
        final formatter = ListHelper.wrapToDynamic<User>((single) {
          final handler = User.toDynamic;
          return handler(single)!;
        });
        return formatter(data._users);
      },
      fromDynamic: (data, value) {
        final parser = ListHelper.wrapFromDynamic<User>((single) {
          final handler = User.fromDynamic;
          return handler(single)!;
        });
        data._users = parser(value);
      }
    ),
  };

  Country({int? id, List<User>? users})
      : _id = id,
        _users = users;

  static Country? fromDynamic(Object? dy) {
    if (dy == null) {
      return null;
    } else if (dy is Map<String, dynamic>) {
      final data = Country();
      dy.forEach((key, dynamicValue) {
        final fieldInfo = _fields[key];
        if (fieldInfo == null) {
          data.setExternalField(key, dynamicValue);
          return;
        }
        fieldInfo.fromDynamic(data, dynamicValue);
      });
      return data;
    }
    throw FormatException('can not parse to country: [$dy]');
  }

  static Map<String, dynamic>? toDynamic(Country? data) {
    if (data == null) {
      return null;
    }
    final result = <String, dynamic>{};
    data.getExternalFields().forEach((key, value) {
      if (value != null) {
        result[key] = value;
      }
    });
    _fields.forEach((key, fieldInfo) {
      final dynamicValue = fieldInfo.toDynamic(data);
      if (dynamicValue != null) {
        result[key] = dynamicValue;
      }
    });
    return result;
  }

  @override
  Map<String, dynamic> encodeDynamic() {
    return toDynamic(this)!;
  }

  @override
  String toString() {
    return encodeDynamic().toString();
  }

  @override
  Object? operator [](String name) {
    var fieldInfo = _fields[name];
    if (fieldInfo == null) {
      return super[name];
    }
    return fieldInfo.getter(this);
  }

  @override
  void operator []=(String name, Object? value) {
    var fieldInfo = _fields[name];
    if (fieldInfo == null) {
      super[name] = value;
      return;
    }
    fieldInfo.setter(this, value);
  }

  int? _id;

  int get id {
    return _id!;
  }

  int? getId() {
    return _id;
  }

  set id(int data) {
    _id = data;
  }

  void setId(int? data) {
    _id = data;
  }

  List<User>? _users;

  List<User> get users {
    return _users!;
  }

  List<User>? getUsers() {
    return _users;
  }

  set users(List<User> data) {
    _users = data;
  }

  void setUsers(List<User>? data) {
    _users = data;
  }
}

class Department extends IDataBasic implements IDataDynamic {
  static final FieldReflectInfo<Department> _fields = {
    "id": (
      getter: (data) => data._id,
      setter: (data, value) => data._id = value as int?,
      toDynamic: (data) {
        final formatter = IntHelper.toDynamic;
        return formatter(data._id);
      },
      fromDynamic: (data, value) {
        final parser = IntHelper.fromDynamic;
        data._id = parser(value);
      }
    ),
    "manager": (
      getter: (data) => data._manager,
      setter: (data, value) => data._manager = value as User?,
      toDynamic: (data) {
        final formatter = User.toDynamic;
        return formatter(data._manager);
      },
      fromDynamic: (data, value) {
        final parser = User.fromDynamic;
        data._manager = parser(value);
      }
    ),
    "colors": (
      getter: (data) => data._colors,
      setter: (data, value) => data._colors = value as List<List<int>>?,
      toDynamic: (data) {
        final formatter = ListHelper.wrapToDynamic<List<int>>((single) {
          final handler = ListHelper.wrapToDynamic<int>((single) {
            final handler = IntHelper.toDynamic;
            return handler(single)!;
          });
          return handler(single)!;
        });
        return formatter(data._colors);
      },
      fromDynamic: (data, value) {
        final parser = ListHelper.wrapFromDynamic<List<int>>((single) {
          final handler = ListHelper.wrapFromDynamic<int>((single) {
            final handler = IntHelper.fromDynamic;
            return handler(single)!;
          });
          return handler(single)!;
        });
        data._colors = parser(value);
      }
    ),
    "peoples": (
      getter: (data) => data._peoples,
      setter: (data, value) => data._peoples = value as Map<String, User>?,
      toDynamic: (data) {
        final formatter = MapHelper.wrapToDynamic<User>((single) {
          final handler = User.toDynamic;
          return handler(single)!;
        });
        return formatter(data._peoples);
      },
      fromDynamic: (data, value) {
        final parser = MapHelper.wrapFromDynamic<User>((single) {
          final handler = User.fromDynamic;
          return handler(single)!;
        });
        data._peoples = parser(value);
      }
    ),
  };

  Department(
      {int? id,
      User? manager,
      List<List<int>>? colors,
      Map<String, User>? peoples})
      : _id = id,
        _manager = manager,
        _colors = colors,
        _peoples = peoples;

  static Department? fromDynamic(Object? dy) {
    if (dy == null) {
      return null;
    } else if (dy is Map<String, dynamic>) {
      final data = Department();
      dy.forEach((key, dynamicValue) {
        final fieldInfo = _fields[key];
        if (fieldInfo == null) {
          data.setExternalField(key, dynamicValue);
          return;
        }
        fieldInfo.fromDynamic(data, dynamicValue);
      });
      return data;
    }
    throw FormatException('can not parse to country: [$dy]');
  }

  static Map<String, dynamic>? toDynamic(Department? data) {
    if (data == null) {
      return null;
    }
    final result = <String, dynamic>{};
    data.getExternalFields().forEach((key, value) {
      if (value != null) {
        result[key] = value;
      }
    });
    _fields.forEach((key, fieldInfo) {
      final dynamicValue = fieldInfo.toDynamic(data);
      if (dynamicValue != null) {
        result[key] = dynamicValue;
      }
    });
    return result;
  }

  @override
  Map<String, dynamic> encodeDynamic() {
    return toDynamic(this)!;
  }

  @override
  String toString() {
    return encodeDynamic().toString();
  }

  @override
  Object? operator [](String name) {
    var fieldInfo = _fields[name];
    if (fieldInfo == null) {
      return super[name];
    }
    return fieldInfo.getter(this);
  }

  @override
  void operator []=(String name, Object? value) {
    var fieldInfo = _fields[name];
    if (fieldInfo == null) {
      super[name] = value;
      return;
    }
    fieldInfo.setter(this, value);
  }

  int? _id;

  int get id {
    return _id!;
  }

  int? getId() {
    return _id;
  }

  set id(int data) {
    _id = data;
  }

  void setId(int? data) {
    _id = data;
  }

  User? _manager;

  User get manager {
    return _manager!;
  }

  User? getManager() {
    return _manager;
  }

  set manager(User data) {
    _manager = data;
  }

  void setManager(User? data) {
    _manager = data;
  }

  List<List<int>>? _colors;

  List<List<int>> get colors {
    return _colors!;
  }

  List<List<int>>? getColors() {
    return _colors;
  }

  set colors(List<List<int>> data) {
    _colors = data;
  }

  void setColors(List<List<int>>? data) {
    _colors = data;
  }

  Map<String, User>? _peoples;

  Map<String, User> get peoples {
    return _peoples!;
  }

  Map<String, User>? getPeoples() {
    return _peoples;
  }

  set peoples(Map<String, User> data) {
    _peoples = data;
  }

  void setPeoples(Map<String, User>? data) {
    _peoples = data;
  }
}

Object? DynamicEncode(Object? info) {
  if (info == null) {
    return info;
  } else if (info is IDataDynamic) {
    return info.encodeDynamic();
  } else if (info is bool) {
    return BoolHelper.toDynamic(info);
  } else if (info is int) {
    return IntHelper.toDynamic(info);
  } else if (info is double) {
    return DoubleHelper.toDynamic(info);
  } else if (info is String) {
    return StringHelper.toDynamic(info);
  } else if (info is List) {
    return info.map((single) => DynamicEncode(single)).toList();
  } else if (info is Map) {
    final data = {};
    info.forEach((key, value) {
      data[DynamicEncode(key)] = DynamicEncode(value);
    });
    return data;
  } else if (info is Set) {
    final data = <dynamic>{};
    for (final value in info) {
      data.add(value);
    }
    return data;
  } else {
    throw FormatException('can not convertTo dynamic: ${info.runtimeType}');
  }
}

int? ApiAddUserInfo([Object? params]) {
  Object? info =
      request(method: 'POST', url: '/api/addUser', data: DynamicEncode(params));
  final parser = IntHelper.fromDynamic;
  return parser(info);
}

List<User>? ApiGetAllUserInfo([Object? params]) {
  Object? info =
      request(method: 'GET', url: '/api/search', data: DynamicEncode(params));
  final parser = ListHelper.wrapFromDynamic((single) {
    final handler = User.fromDynamic;
    return handler(single)!;
  });
  return parser(info);
}
