create table user(
    id int(11) not null auto_increment,
    name varchar(255) not null,
    primary key(id)
);

create table my_order(
     id int(11) not null auto_increment,
     order_date date not null,
     create_time timestamp not null,
     primary key(id)
);