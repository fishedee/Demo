drop database if exists test1;

create database test1;

use test1;

create table user(
	id integer not null auto_increment,
	name varchar(64) not null,
	password varchar(64) not null,
	role varchar(32) not null,
	createTime datetime not null default CURRENT_TIMESTAMP,
	modifyTime datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table persistent_logins(
	username varchar(64) not null,
	series varchar(64) not null,
	token varchar(64) not null,
	last_used datetime not null,
	primary key(series)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

insert into  user(name,role,password) values
("fish","Admin","$2a$12$WtxiMJuXjgzCpa1OWT8hR.wMpxq0DbeF1fMpCJbdzCdhdYte1ZtfC"),
("cat","Admin","$2a$12$WtxiMJuXjgzCpa1OWT8hR.wMpxq0DbeF1fMpCJbdzCdhdYte1ZtfC");

drop database if exists test2;

create database test2;

use test2;

create table user(
                     id integer not null auto_increment,
                     name varchar(64) not null,
                     password varchar(64) not null,
                     role varchar(32) not null,
                     createTime datetime not null default CURRENT_TIMESTAMP,
                     modifyTime datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
                     primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table persistent_logins(
                                  username varchar(64) not null,
                                  series varchar(64) not null,
                                  token varchar(64) not null,
                                  last_used datetime not null,
                                  primary key(series)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

insert into  user(name,role,password) values
("fish","Admin","$2a$12$WtxiMJuXjgzCpa1OWT8hR.wMpxq0DbeF1fMpCJbdzCdhdYte1ZtfC");

