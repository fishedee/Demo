abstract interface class IData {
  Object? operator [](String name);
  void operator []=(String name, Object? value);
}

class BoolHelper {
  static bool? fromJson(Object? data) {
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

  static Object? toJson(bool? data) {
    return data;
  }
}

class IntHelper {
  static int? fromJson(Object? data) {
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

  static Object? toJson(int? data) {
    return data;
  }
}

class DoubleHelper {
  static double? fromJson(Object? data) {
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

  static Object? toJson(double? data) {
    return data;
  }
}

class StringHelper {
  static String? fromJson(Object? data) {
    if (data == null) {
      return null;
    } else if (data is String ||
        data is double ||
        data is String ||
        data is bool) {
      return data.toString();
    }
    throw FormatException('can not parse to String: [$data]');
  }

  static Object? toJson(String? data) {
    return data;
  }
}

class ListHelper {
  static List<T>? Function(Object? data) wrapFromJson<T>(
      T Function(Object? item) fromJsonItem) {
    return (Object? data) {
      if (data == null) {
        return null;
      } else if (data is List) {
        return data.map((single) => fromJsonItem(single)).toList();
      }
      throw FormatException('can not parse to list: [$data]');
    };
  }

  static Object? Function(List<T>? data) wrapToJson<T>(
      Object Function(T data) toJsonItem) {
    return (List<T>? data) {
      if (data == null) {
        return null;
      }
      return data.map((single) => toJsonItem(single)).toList();
    };
  }
}

class MapHelper {
  static Map<String, T>? Function(Object? data) wrapFromJson<T>(
      T Function(Object? item) fromJsonItem) {
    return (Object? data) {
      if (data == null) {
        return null;
      } else if (data is Map<String, Object?>) {
        final result = <String, T>{};
        data.forEach((key, value) {
          result[key] = fromJsonItem(value);
        });
        return result;
      }
      throw FormatException('can not parse to map: [$data]');
    };
  }

  static Object? Function(Map<String, T>? data) wrapToJson<T>(
      Object Function(T data) toJsonItem) {
    return (Map<String, T>? data) {
      if (data == null) {
        return null;
      }
      final result = <String, dynamic>{};
      data.forEach((key, value) {
        result[key] = toJsonItem(value);
      });
      return result;
    };
  }
}

typedef GetterHandler<T> = Object? Function(T data);
typedef SetterHandler<T> = void Function(T data, Object? value);
typedef ToJsonHandler<T> = Object? Function(T data);
typedef FromJsonHandler<T> = void Function(T data, Object? value);
typedef FieldReflectInfo<T> = Map<
    String,
    ({
      GetterHandler<T> getter,
      SetterHandler<T> setter,
      ToJsonHandler<T> toJson,
      FromJsonHandler<T> fromJson
    })>;

class IDataBasic implements IData {
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

class User extends IDataBasic {
  static final FieldReflectInfo<User> _fields = {
    "id": (
      getter: (data) => data._id,
      setter: (data, value) => data._id = value as int?,
      toJson: (data) {
        final formatter = IntHelper.toJson;
        return formatter(data._id);
      },
      fromJson: (data, value) {
        final parser = IntHelper.fromJson;
        data._id = parser(value);
      }
    ),
    "name": (
      getter: (data) => data._name,
      setter: (data, value) => data._name = value as String?,
      toJson: (data) {
        final formatter = StringHelper.toJson;
        return formatter(data._name);
      },
      fromJson: (data, value) {
        final parser = StringHelper.fromJson;
        data._name = parser(value);
      }
    ),
    "isVip": (
      getter: (data) => data._isVip,
      setter: (data, value) => data._isVip = value as bool?,
      toJson: (data) {
        final formatter = BoolHelper.toJson;
        return formatter(data._isVip);
      },
      fromJson: (data, value) {
        final parser = BoolHelper.fromJson;
        data._isVip = parser(value);
      }
    ),
  };

  User({int? id, String? name, bool? isVip})
      : _id = id,
        _name = name,
        _isVip = isVip;

  static User? fromJson(Object? json) {
    if (json == null) {
      return null;
    } else if (json is Map<String, dynamic>) {
      final user = User();
      json.forEach((key, jsonValue) {
        final fieldInfo = _fields[key];
        if (fieldInfo == null) {
          user.setExternalField(key, jsonValue);
          return;
        }
        fieldInfo.fromJson(user, jsonValue);
      });
    }
    throw FormatException('can not parse to user: [$json]');
  }

  static Map<String, dynamic>? toJson(User? data) {
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
      final jsonValue = fieldInfo.toJson(data);
      if (jsonValue != null) {
        result[key] = jsonValue;
      }
    });
    return result;
  }

  Map<String, dynamic> toDynamic() {
    return toJson(this)!;
  }

  @override
  String toString() {
    return toDynamic().toString();
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

class Country extends IDataBasic {
  static final FieldReflectInfo<Country> _fields = {
    "id": (
      getter: (data) => data._id,
      setter: (data, value) => data._id = value as int?,
      toJson: (data) {
        final formatter = IntHelper.toJson;
        return formatter(data._id);
      },
      fromJson: (data, value) {
        final parser = IntHelper.fromJson;
        data._id = parser(value);
      }
    ),
    "users": (
      getter: (data) => data._users,
      setter: (data, value) => data._users = value as List<User>?,
      toJson: (data) {
        final formatter = ListHelper.wrapToJson<User>((single) {
          final handler = User.toJson;
          return handler(single)!;
        });
        return formatter(data._users);
      },
      fromJson: (data, value) {
        final parser = ListHelper.wrapFromJson<User>((single) {
          final handler = User.fromJson;
          return handler(single)!;
        });
        data._users = parser(value);
      }
    ),
  };

  Country({int? id, List<User>? users})
      : _id = id,
        _users = users;

  static Country? fromJson(Object? json) {
    if (json == null) {
      return null;
    } else if (json is Map<String, dynamic>) {
      final data = Country();
      json.forEach((key, jsonValue) {
        final fieldInfo = _fields[key];
        if (fieldInfo == null) {
          data.setExternalField(key, jsonValue);
          return;
        }
        fieldInfo.fromJson(data, jsonValue);
      });
      return data;
    }
    throw FormatException('can not parse to country: [$json]');
  }

  static Map<String, dynamic>? toJson(Country? data) {
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
      final jsonValue = fieldInfo.toJson(data);
      if (jsonValue != null) {
        result[key] = jsonValue;
      }
    });
    return result;
  }

  Map<String, dynamic> toDynamic() {
    return toJson(this)!;
  }

  @override
  String toString() {
    return toDynamic().toString();
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

class Department extends IDataBasic {
  static final FieldReflectInfo<Department> _fields = {
    "id": (
      getter: (data) => data._id,
      setter: (data, value) => data._id = value as int?,
      toJson: (data) {
        final formatter = IntHelper.toJson;
        return formatter(data._id);
      },
      fromJson: (data, value) {
        final parser = IntHelper.fromJson;
        data._id = parser(value);
      }
    ),
    "manager": (
      getter: (data) => data._manager,
      setter: (data, value) => data._manager = value as User?,
      toJson: (data) {
        final formatter = User.toJson;
        return formatter(data._manager);
      },
      fromJson: (data, value) {
        final parser = User.fromJson;
        data._manager = parser(value);
      }
    ),
    "colors": (
      getter: (data) => data._colors,
      setter: (data, value) => data._colors = value as List<List<int>>?,
      toJson: (data) {
        final formatter = ListHelper.wrapToJson<List<int>>((single) {
          final handler = ListHelper.wrapToJson<int>((single) {
            final handler = IntHelper.toJson;
            return handler(single)!;
          });
          return handler(single)!;
        });
        return formatter(data._colors);
      },
      fromJson: (data, value) {
        final parser = ListHelper.wrapFromJson<List<int>>((single) {
          final handler = ListHelper.wrapFromJson<int>((single) {
            final handler = IntHelper.fromJson;
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
      toJson: (data) {
        final formatter = MapHelper.wrapToJson<User>((single) {
          final handler = User.toJson;
          return handler(single)!;
        });
        return formatter(data._peoples);
      },
      fromJson: (data, value) {
        final parser = MapHelper.wrapFromJson<User>((single) {
          final handler = User.fromJson;
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

  static Department? fromJson(Object? json) {
    if (json == null) {
      return null;
    } else if (json is Map<String, dynamic>) {
      final data = Department();
      json.forEach((key, jsonValue) {
        final fieldInfo = _fields[key];
        if (fieldInfo == null) {
          data.setExternalField(key, jsonValue);
          return;
        }
        fieldInfo.fromJson(data, jsonValue);
      });
      return data;
    }
    throw FormatException('can not parse to country: [$json]');
  }

  static Map<String, dynamic>? toJson(Department? data) {
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
      final jsonValue = fieldInfo.toJson(data);
      if (jsonValue != null) {
        result[key] = jsonValue;
      }
    });
    return result;
  }

  Map<String, dynamic> toDynamic() {
    return toJson(this)!;
  }

  @override
  String toString() {
    return toDynamic().toString();
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
