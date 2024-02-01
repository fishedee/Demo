abstract interface class IData{
  dynamic operator[](String name);
  void operator[]=(String name, dynamic value);
}

class Helper{
  static int emptyInt(){
    return 0;
  }

  static int? parseInt(Object? data){
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

  static double emptyDouble(){
    return 0.0;
  }

  static double? parseDouble(Object? data){
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

  static String emptyString(){
    return "";
  }

  static String? parseString(Object? data){
    if( data is String || data is double || data is String){
      return data.toString();
    }else{
      return null;
    }
  }
}

class DefaultIData implements IData{
  final Map<String,dynamic> _extendFields = {};

  Map<String,dynamic> getExtendFiels(){
    return _extendFields;
  }

  @override
  dynamic operator[](String name){
    return _extendFields[name];
  }

  @override
  void operator[]=(String name, dynamic value){
    _extendFields[name] = value;
  }
}

class User{
  int? _id;

  int get id{
    final data = _id;
    if(data == null){
      return Helper.emptyInt();
    }
    return data;
  }

  int? getId(){
    return _id;
  }

  set id(int data){
    _id = data;
  }

  setId(Object data){
    _id = Helper.parseInt(data);
  }

  String? _name;

  String get name{
    final data = _name;
    if(data == null){
      return '';
    }
    return data;
  }

  set name(){

  }
}