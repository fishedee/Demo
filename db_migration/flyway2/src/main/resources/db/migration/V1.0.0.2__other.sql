create table material_stock_order(
                                     id integer not null auto_increment,
                                     item_size integer not null,
                                     create_time timestamp not null default CURRENT_TIMESTAMP,
                                     modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
                                     primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table material_stock_order_items(
                                           material_stock_order_id integer not null,
                                           items_key integer not null,
                                           material_id integer not null,
                                           amount decimal(15,2) not null,
                                           unit_id integer not null,
                                           create_time timestamp not null default CURRENT_TIMESTAMP,
                                           modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
                                           primary key(material_stock_order_id,items_key)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table item_stock_order(
                                 id integer not null auto_increment,
                                 create_time timestamp not null default CURRENT_TIMESTAMP,
                                 modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
                                 primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table item_stock_order_items(
                                       item_stock_order_item_id integer not null auto_increment,
                                       item_stock_order_id integer not null,
                                       item_id integer not null,
                                       amount decimal(15,2) not null,
                                       item_name varchar(255) not null,
                                       create_time timestamp not null default CURRENT_TIMESTAMP,
                                       modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
                                       primary key(item_stock_order_item_id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;
