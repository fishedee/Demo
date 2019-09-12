#创建数据库food_data
CREATE DATABASE "food_data"

#在influxdb中，measurement相当于表，但是完整的表名，不是database.measurement，而是database.retention_policy.measurement
#默认的保留规则retention_policy是保留全部数据

#覆盖默认的保留规则是只保留2小时，保留规则的名称为two_hours，default表示这是默认规则
CREATE RETENTION POLICY "two_hours" ON "food_data" DURATION 2h REPLICATION 1 DEFAULT

#创建一个保留52周的保留规则，保留规则的名称为a_year
CREATE RETENTION POLICY "a_year" ON "food_data" DURATION 52w REPLICATION 1

use food_data;

#创建连续查询业务，名称为cq_30m
#它是每30分钟跑一次，group by time(30m)
#读取orders的数据，取出website和phone的平均值
#然后写入到a_year.downsampled_orders表中，注意，a_year是保留规则，downsampled_orders是measurement
CREATE CONTINUOUS QUERY "cq_30m" ON "food_data" BEGIN
  SELECT mean("website") AS "mean_website",mean("phone") AS "mean_phone"
  INTO "a_year"."downsampled_orders"
  FROM "orders"
  GROUP BY time(30m)
END