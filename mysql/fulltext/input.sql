#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_recipe(
	recipeId integer not null auto_increment,	
	clientId int not null,
	title varchar(255) not null,
	summary varchar(10240) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	primary key( recipeId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_recipe add fulltext index contentIndex(title,summary) with parser ngram;

insert into t_recipe(clientId,title,summary) values
(10001,"","雷峰塔是一个著名的景点"),
(10002,"","雷峰是一个伟大的人物，其开发过一个叫尖峰塔防的游戏");
select *,match(title,summary) against('雷峰塔') from t_recipe where match(title,summary) against('雷峰塔');