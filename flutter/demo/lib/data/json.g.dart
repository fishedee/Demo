// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'json.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Address _$AddressFromJson(Map<String, dynamic> json) => Address(
      json['street'] as String?,
      json['city'] as String,
    );

Map<String, dynamic> _$AddressToJson(Address instance) => <String, dynamic>{
      'street': instance.street,
      'city': instance.city,
    };

Item _$ItemFromJson(Map<String, dynamic> json) => Item(
      json['id'] as int,
      Decimal.fromJson(json['amount'] as String),
      json['price'] == null ? null : Decimal.fromJson(json['price'] as String),
    );

Map<String, dynamic> _$ItemToJson(Item instance) => <String, dynamic>{
      'id': instance.id,
      'amount': instance.amount,
      'price': instance.price,
    };

User _$UserFromJson(Map<String, dynamic> json) => User(
      json['name'] as String,
      json['address'] == null
          ? null
          : Address.fromJson(json['address'] as Map<String, dynamic>),
      (json['items'] as List<dynamic>)
          .map((e) => Item.fromJson(e as Map<String, dynamic>))
          .toList(),
      $enumDecodeNullable(_$ColorEnumMap, json['color']),
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'name': instance.name,
      'address': instance.address?.toJson(),
      'color': _$ColorEnumMap[instance.color],
      'items': instance.items.map((e) => e.toJson()).toList(),
    };

const _$ColorEnumMap = {
  Color.red: 'red',
  Color.green: 'green',
  Color.blue: 'blue',
};
