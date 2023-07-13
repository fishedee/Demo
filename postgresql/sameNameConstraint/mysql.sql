drop database if exists Test;
create database Test;
use Test;
create table Operator(
	id integer not null auto_increment,
	name varchar(32) not null,
	primary key(id)
)engine=innodb;
alter table Operator add unique index name_index(name);
