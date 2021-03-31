drop database if exists Test;
create database Test;

use Test;

create table t_country(
	countryId integer not null auto_increment,
	name varchar(255) not null,
	code varchar(255) not null,
	continentId integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP ,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP not null,
	primary key(countryId)
)engine=innodb;

create table t_continent(
	continentId integer not null auto_increment,
	name varchar(255) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP ,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP not null,
	primary key(continentId)
)engine=innodb;

create table t_people(
	people_id integer not null auto_increment,
	name varchar(255) not null,
	home_address varchar(255) not null,
	primary_email varchar(255) not null,
	countryId integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP ,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP not null,
	primary key(people_id)
)engine=innodb;

insert into t_continent(continentId,name)values
(10001,"亚洲"),
(10002,"北美洲"),
(10003,"欧洲");

insert into t_country(countryId,name,code,continentId) values
(20001,"中国","CN",10001),
(20002,"美国","US",10002),
(20003,"俄罗斯","RU",10003),
(20004,"英国","GB",10003),
(20005,"法国","FR",10003);

insert into t_people(name,home_address,primary_email,countryId) values
("李伟","北京","123@qq.com",20001),
("宋希","佛山","456@qq.com",20001),
("David","Canlifornia","789@google.com",20002),
("Kate","Washington","abc@google.com",20002);