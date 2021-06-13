create table sales_order(
    id integer not null auto_increment,
    create_time timestamp not null default CURRENT_TIMESTAMP,
    modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table sales_order_user(
     sales_order_id integer not null,
     user_id integer not null,
     create_time timestamp not null default CURRENT_TIMESTAMP,
     modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
     primary key(sales_order_id,user_id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table hibernate_sequence(
   next_val bigint not null,
   primary key(next_val)
)engine=innodb;

insert into hibernate_sequence(next_val) values(10001);

create table my_sequence(
    next_val bigint not null,
    primary key(next_val)
)engine=innodb;

insert into my_sequence values (10001);