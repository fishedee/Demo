drop schema public cascade;
create schema public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

CREATE TABLE public.item (
    id integer NOT NULL,
    name varchar(64) not null,
    order_id integer not null,
    primary key(id)
);

create table public.uorder(
    id integer not null,
    total integer not null,
    primary key(id)
);

insert into public.item(id,name,order_id)values
(1,'fish1',1),
(2,'fish2',1),
(3,'fish1',2),
(4,'fish3',2);

insert into public.uorder(id,total)values
(1,50),
(2,50);

WITH filtered_items AS (
  SELECT *
  FROM public.item
  WHERE name LIKE '%1%' OR name LIKE '%2%'
)
SELECT
  (SELECT SUM(uorder.total) FROM public.uorder WHERE id IN (SELECT order_id FROM filtered_items)) as total_sum,
  (SELECT COUNT(*) FROM filtered_items) as count_filtered_items;
