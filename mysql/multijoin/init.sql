drop database if exists Test;

create database Test;

use Test;

create table a(
	id integer not null,
	primary key(id)
)engine=innodb;

create table b(
	id integer not null,
	primary key(id)
)engine=innodb;

create table c(
	id integer not null,
	primary key(id)
)engine=innodb;

insert into a(id) values(1),(2),(3),(4);
insert into b(id) values(1),(2),(3);
insert into c(id) values(1),(2),(3),(4);

# a表与b表，内关联以后生成临时表K
# 然后临时表K与C进行左外关联
select * from a 
	inner join b on a.id = b.id 
	left join c on a.id = c.id;

# a表与b表，左外关联以后生成临时表K
# 然后临时表K与C进行内关联
select * from a 
	left join b on a.id = b.id 
	inner join c on a.id = c.id;