#创建数据库
use MySqlTest;

#创建表
select * from t_user limit 1000,10;
select * from t_article limit 10000,10;

#子查询
select * from t_user,(select userId from t_article where title="4tLu7E8iMfL0Zjr8") as t2 where t_user.userId = t2.userId;
select sql_no_cache * from t_user where userId in (select userId from t_article where title="4tLu7E8iMfL0Zjr8")\G;
select sql_no_cache * from t_user where exists (select userId from t_article where title="4tLu7E8iMfL0Zjr8" and t_user.userId = t_article.userId)\G;
select sql_no_cache * from t_user join t_article on t_user.userId = t_article.userId and t_article.title="4tLu7E8iMfL0Zjr8"\G;

select * from t_article,(select userId from t_user where name="VJS9ADOx4kEZKFAm") as t2 where t_article.userId = t2.userId;
select sql_no_cache * from t_article where userId in (select userId from t_user where name="VJS9ADOx4kEZKFAm")\G;
select sql_no_cache * from t_article where exists (select userId from t_user where name="VJS9ADOx4kEZKFAm" and t_user.userId = t_article.userId)\G;
select sql_no_cache * from t_article join t_user on t_user.userId = t_article.userId and t_user.name="VJS9ADOx4kEZKFAm"\G;
