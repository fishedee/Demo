import 'package:demo/scroll/silverPersistHeader.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//看这里
//https://cloud.tencent.com/developer/article/2321484?areaId=106001
class ItemData {
  final String groupName;
  final List<String> users;

  ItemData({required this.groupName, this.users = const []});

  static List<ItemData> get testData => [
        ItemData(groupName: '幻将术士', users: ['梦小梦', '梦千']),
        ItemData(
            groupName: '幻将剑客', users: ['捷特', '龙少', '莫向阳', '何解连', '浪封', '梦飞烟']),
        ItemData(groupName: '幻将弓者', users: ['巫缨', '巫妻孋', '摄王', '裔王', '梦童']),
        ItemData(
            groupName: '其他', users: List.generate(20, (index) => '小兵$index')),
      ];
}

//SliverMainAxisGroup包含一个SliverPersistentHeader和SliverList就可以轻松做到分组吸顶的效果
class SilverMainAxisGroupDemo extends StatelessWidget {
  const SilverMainAxisGroupDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: ItemData.testData.map(_buildGroup).toList(),
    );
  }

  Widget _buildGroup(ItemData itemData) {
    return SliverMainAxisGroup(slivers: [
      SliverPersistentHeader(
        pinned: true,
        delegate: SliverHeaderDelegate(
          minHeight: 40,
          maxHeight: 40,
          pinned: true,
          child: Container(
            alignment: Alignment.centerLeft,
            color: const Color(0xffF6F6F6),
            padding: const EdgeInsets.only(left: 20),
            height: 40,
            child: Text(itemData.groupName),
          ),
        ),
      ),
      SliverList(
        delegate: SliverChildBuilderDelegate(
          (_, index) => _buildItemByUser(itemData.users[index]),
          childCount: itemData.users.length,
        ),
      ),
    ]);
  }

  Widget _buildItemByUser(String user) {
    return Container(
      alignment: Alignment.center,
      height: 56,
      child: Row(
        children: [
          const Padding(
            padding: EdgeInsets.only(left: 20, right: 10.0),
            child: FlutterLogo(size: 30),
          ),
          Text(
            user,
            style: const TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }
}
