abstract interface class IData{
  Object? operator[](String name);
  void operator[]=(String name, Object? value);
}

class BoolHelper{
  static bool empty(){
    return false;
  }

  static bool? parse(Object?data ){
    if( data is bool ){
      return data;
    }else if( data is String ){
      if( data.trim().toLowerCase() == 'true'){
        return true;
      }else if( data.trim().toLowerCase() == 'false'){
        return false;
      }
      return null;
    }else{
      return null;
    }
  }
}

class IntHelper{
  static int empty(){
    return 0;
  }

  static int? parse(Object? data){
    if( data is int){
      return data;
    }else if( data is double ){
      return data.toInt();
    }else if( data is String ){
      return int.tryParse(data);
    }else{
      return null;
    }
  }
}

class DoubleHelper{
  static double empty(){
    return 0.0;
  }

  static double? parse(Object? data){
    if( data is int){
      return data.toDouble();
    }else if( data is double ){
      return data;
    }else if( data is String ){
      return double.tryParse(data);
    }else{
      return null;
    }
  }
}

class StringHelper{
  static String empty(){
    return "";
  }

  static String? parse(Object? data){
    if( data is String || data is double || data is String){
      return data.toString();
    }else{
      return null;
    }
  }
}

class ListHelper{
  static List<T> empty<T>(){
    return List<T>.empty();
  }

  static List<T>? parse<T>(Object? data){
    if( data is List<T>){
      return data;
    }else{
      return null;
    }
  }

  static List<dynamic>? toDynamic<T>(Object? data,dynamic Function(T data) toDynamicHandle){
    final result = data?.map(toDynamicHandle).toList();
    return result;
  }

  static void fromDynamic(dynamic value,void Function(dynamic single) fromDynamicHandle){
    if( value is List ){
      value.forEach(fromDynamicHandle); 
    }
  }
}

typedef SetterHandler<T> = void Function(T data,Object? value);
typedef GetterHandler<T> = Object? Function(T data);
typedef ToDynamicHandler<T> = dynamic Function(Object? value);
typedef FromDynamicHandler<T> = Object? Function(dynamic jsonValue);
typedef FieldReflectInfo<T> = Map<String,({GetterHandler<T> getter,SetterHandler<T> setter,ToDynamicHandler<T> toDynamic,FromDynamicHandler<T> fromDynamic})>;

class IDataBasic implements IData{
  final Map<String,Object?> _externalFields = {};

  IDataBasic();

  Map<String,Object?> getExternalFields(){
    return _externalFields;
  }

  Object? getExternalField(String name){
    return _externalFields[name];
  }

  @override
  Object? operator[](String name){
    return _externalFields[name];
  }

  void setExternalField(String name,Object? value){
    _externalFields[name] = value;
  }

  @override
  void operator[]=(String name, Object? value){
    _externalFields[name] = value;
  }
}

class  IDataField{
  final String key;

  const IDataField(this.key);
}

class UserField extends IDataField{

  static const UserField id = UserField("id");

  static const UserField name = UserField("name");

  static const UserField isVip = UserField("isVip");

  const UserField(super.key);
}

class User extends IDataBasic{
  static final FieldReflectInfo<User> _fields = {
    "id":(getter:(data)=>data.getId(),setter:(data,value)=>data.setId(value),toDynamic:(value)=>value,fromDynamic:(json)=>json),
    "name":(getter:(data)=>data.getName(),setter:(data,value)=>data.setName(value),toDynamic:(value)=>value,fromDynamic:(json)=>json),
    "isVip":(getter:(data)=>data.getIsVip(),setter:(data,value)=>data.setIsVip(value),toDynamic:(value)=>value,fromDynamic:(json)=>json),
  };

  User({int? id,String? name,bool? isVip})
  :_id = id,
  _name = name,
  _isVip = isVip;

  User.empty();

  factory User.fromJson(Map<String, dynamic> json){
    final user = User.empty();
    json.forEach((key,jsonValue){
      final fieldInfo = _fields[key];
      if(fieldInfo == null ){
        user.setExternalField(key, jsonValue);
        return;
      }
      final value = fieldInfo.fromDynamic(jsonValue);
      fieldInfo.setter(user,value);
    });
    return user;
  }

  Map<String,dynamic> toJson(){
    final result = <String,dynamic>{};
    result.addAll(super.getExternalFields());
    _fields.forEach((key,fieldInfo){
      final value = fieldInfo.getter(this);
      final jsonValue = fieldInfo.toDynamic(value);
      result[key] = jsonValue;
    });
    return result;
  }

  @override
  String toString(){
    return toJson().toString();
  }

  @override
  Object? operator[](String name){
    var fieldInfo = _fields[name];
    if( fieldInfo == null){
      return super[name];
    }
    return fieldInfo.getter(this);
  }

  @override
  void operator[]=(String name, Object? value){
    var fieldInfo = _fields[name];
    if( fieldInfo == null ){
      super[name] = value;
      return;
    }
    fieldInfo.setter(this,value);
  }

  int? _id;

  int get id{
    final data = _id;
    if(data == null){
      return IntHelper.empty();
    }
    return data;
  }

  int? getId(){
    return _id;
  }

  set id(int data){
    _id = data;
  }

  void setId(Object? data){
    _id = IntHelper.parse(data);
  }

  String? _name;

  String get name{
    final data = _name;
    if(data == null){
      return StringHelper.empty();
    }
    return data;
  }

  String? getName(){
    return _name;
  }

  set name(String data){
    _name = data;
  }

  setName(Object? data){
    _name = StringHelper.parse(data);
  }

  bool? _isVip;

  bool get isVip{
    final data = _isVip;
    if( data == null ){
      return BoolHelper.empty();
    }
    return data;
  }

  bool? getIsVip(){
    return _isVip;
  }

  set isVip(bool data ){
    _isVip = data;
  }

  setIsVip(Object? data){
    _isVip = BoolHelper.parse(data);
  }
}


class Country extends IDataBasic{
  static final FieldReflectInfo<Country> _fields = {
    "id":(getter:(data)=>data.getId(),setter:(data,value)=>data.setId(value),toDynamic:(value)=>value,fromDynamic:(jsonValue)=>jsonValue),
    "users":(getter:(data)=>data.getUsers(),setter:(data,value)=>data.setUsers(value),toDynamic:(value)=>ListHelper.toDynamic(data.getUsers(),(user)=>user.toJson()),fromJson:(data,value)=>ListHelper.fromJson(value,(single)=>User.fromJson(single))),
  };

  Country({int? id,List<User>? users})
  :_id = id,
  _users = users;

  Country.empty();

   factory Country.fromJson(Map<String, dynamic> json){
    final user = Country.empty();
    json.forEach((key,jsonValue){
      final fieldInfo = _fields[key];
      if(fieldInfo == null ){
        user.setExternalField(key, jsonValue);
        return;
      }
      final value = fieldInfo.fromDynamic(jsonValue);
      fieldInfo.setter(user,value);
    });
    return user;
  }

  Map<String,dynamic> toJson(){
    final result = <String,dynamic>{};
    result.addAll(super.getExternalFields());
    _fields.forEach((key,fieldInfo){
      final value = fieldInfo.getter(this);
      final jsonValue = fieldInfo.toDynamic(value);
      result[key] = jsonValue;
    });
    return result;
  }

  @override
  String toString(){
    return toJson().toString();
  }

  @override
  Object? operator[](String name){
    var fieldInfo = _fields[name];
    if( fieldInfo == null){
      return super[name];
    }
    return fieldInfo.getter(this);
  }

  @override
  void operator[]=(String name, Object? value){
    var fieldInfo = _fields[name];
    if( fieldInfo == null ){
      super[name] = value;
      return;
    }
    fieldInfo.setter(this,value);
  }

  int? _id;

  int get id{
    final data = _id;
    if(data == null){
      return IntHelper.empty();
    }
    return data;
  }

  int? getId(){
    return _id;
  }

  set id(int data){
    _id = data;
  }

  void setId(Object? data){
    _id = IntHelper.parse(data);
  }

  List<User>? _users;

  List<User> get users{
    final data = _users;
    if(data == null){
      return ListHelper.empty();
    }
    return data;
  }

  List<User>? getUsers(){
    return _users;
  }

  set users(List<User> data){
    _users = data;
  }

  void setUsers(Object? data){
    _users = ListHelper.parse(data);
  }
}