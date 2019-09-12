#schema的设计

#1 用tag来区分数据，而不是用measurement的名字来区分名字

## 1.1 这样设计就不好

insert blueberries.plot-1.north temp=50.1 1472515200000000000
insert blueberries.plot-2.midwest temp=49.8 1472515200000000000

## 1.2 这样设计就可以

insert weather_sensor,crop=blueberries,plot=1,region=north temp=50.1 1472515200000000000
insert weather_sensor,crop=blueberries,plot=2,region=midwest temp=49.8 1472515200000000000

# 2 灵活使用多个tag来区分数据，而不是使用tag的名字来区分数据

## 2.1 这样设计就不好

insert weather_sensor,crop=blueberries,location=plot-1.north temp=50.1 1472515200000000000
insert weather_sensor,crop=blueberries,location=plot-2.midwest temp=49.8 1472515200000000000

## 2.2 这样设计就很好
insert weather_sensor,crop=blueberries,plot=1,region=north temp=50.1 1472515200000000000
insert weather_sensor,crop=blueberries,plot=2,region=midwest temp=49.8 1472515200000000000