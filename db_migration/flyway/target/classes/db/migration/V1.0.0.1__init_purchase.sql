create table purchase_order(
    id integer not null auto_increment,
    total decimal(15,4) not null,
    create_time timestamp not null default CURRENT_TIMESTAMP,
    modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table purchase_order_items(
     purchase_order_id integer not null,
     items_order integer not null,
     item_id integer not null,
     price decimal(15,2) not null,
     amount decimal(15,2) not null,
     total decimal(15,4) not null,
     create_time timestamp not null default CURRENT_TIMESTAMP,
     modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
     primary key(purchase_order_id,items_order)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;