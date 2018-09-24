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
(10002,"","尖峰塔防是一款非常火爆的游戏，其是以雷峰作为原型开发的");

select *,match(title,summary) against('雷峰塔') from t_recipe where match(title,summary) against('雷峰塔')\G;
select *,match(title,summary) against('雷峰塔' in boolean mode) from t_recipe where match(title,summary) against('雷峰塔' in boolean mode)\G;

#创建表
create table t_recipe2(
	recipeId2 integer not null auto_increment,	
	clientId int not null,
	title varchar(255) not null,
	summary varchar(10240) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	primary key( recipeId2 )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_recipe2 add fulltext index contentIndex(title,summary);

insert into t_recipe2(clientId,title,summary) values
(10001,"","雷峰塔 是 一个 著名 的 景点"),
(10002,"","尖峰 塔防 是 一款 非常 火爆 的 游戏，其 是以 雷峰 作为 原型 开发 的");

select *,match(title,summary) against('雷峰') from t_recipe2 where match(title,summary) against('雷峰')\G;
select *,match(title,summary) against('雷峰'  in boolean mode) from t_recipe2 where match(title,summary) against('雷峰' in boolean mode)\G;
select *,match(title,summary) against('雷峰'  in boolean mode) from t_recipe2 where match(title,summary) against('*雷峰*' in boolean mode)\G;