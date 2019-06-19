#创建数据库
use MySqlTest;

#查询

explain select * from t_remind_1 where receiveClientId = 5234 and (remindType in (3,6,2)) and ( contentType in (2,4)) order by remindId desc limit 10\G;
select * from t_remind_1 where receiveClientId = 5234 and (remindType in (3,6,2)) and ( contentType in (2,4)) order by remindId desc limit 10;