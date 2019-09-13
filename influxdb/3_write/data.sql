#最后一个值肯定是空格,cpu是measurement，相当于table
#第一个是tag/tag_value以逗号连接，允许多个，会建立索引
#第二个是field/field_value以逗号连接，允许多个，不会建立索引
#第三个是时间，只能有一个，不填的话代表当前时间
insert cpu,host=serverA,region=us_west value=0.64
insert cpu,host=serverB,region=uk_west value=0.64

#可以动态添加列
insert cpu,host=serverB,region=uk_west xvalue=0.64


#由于索引是通过tag的，所以特定的RP和measurement下的特定tag代表一个series。
#series就是特定的tag下的特定measurement的数据，它的值就是这些条件下的时间序列数据。
#每个point就是特定的series加特定的timestamp，它的值就是field/field_value

select * from cpu
select * from cpu where value > 0.6
select * from cpu where host = 'serverA'

/*
field_value默认是浮点数
weather,location=us-midwest temperature=82 1465839830100400200

field_value需要是整数时，后面加一个i
weather,location=us-midwest temperature=82i 1465839830100400200

field_value需要是字符串时，前后用双引号
weather,location=us-midwest temperature="too warm" 1465839830100400200

field_value需要是布尔值时，用true或者false
weather,location=us-midwest too_hot=true 1465839830100400200

tag_value只能是字符串类型，可以用，也可以不用，双引号的包含
*/