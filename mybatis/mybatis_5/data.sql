drop database if exists Test;
create database Test;

use Test;

create table t_country(
	id integer not null auto_increment,
	countryName varchar(255) not null,
	countryCode varchar(255) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP ,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP not null,
	primary key(id)
)engine=innodb;

insert into t_country(countryName,countryCode) values
("中国","CN"),
("美国","US"),
("俄罗斯","RU"),
("英国","GB"),
("法国","FR");