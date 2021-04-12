drop database if exists Test;
create database Test;

use Test;

create table t_country(
	id integer not null auto_increment,
	country_name varchar(255) not null,
	country_code varchar(255) not null,
	primary key(id)
)engine=innodb;

insert into t_country(country_name,country_code) values
("中国","CN"),
("美国","US"),
("俄罗斯","RU"),
("英国","GB"),
("法国","FR");