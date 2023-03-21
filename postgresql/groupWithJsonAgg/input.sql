drop schema public cascade;
create schema public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

create table public.uorder(
    id integer not null,
    contact_id integer not null,
    create_time timestamp not null,
    total integer not null,
    total2 integer not null,
    primary key(id)
);

insert into public.uorder(id,contact_id,create_time,total,total2)values
(1,1,'2022-01-02 00:00:00',1,2),
(2,1,'2022-01-02 00:00:00',2,3),
(3,2,'2022-01-03 00:00:00',3,4),
(4,2,'2022-01-02 00:00:00',4,5),
(5,3,'2022-01-04 00:00:00',5,6),
(6,3,'2022-01-03 00:00:00',6,7);

WITH daily_totals AS (
  SELECT
    contact_id,
    create_time::date AS date,
    SUM(total) AS total,
    SUM(total2) AS total2
  FROM public.uorder
  GROUP BY cube(contact_id, create_time::date)
),
aggregated_daily_totals AS (
  SELECT
    contact_id,
    json_agg(json_build_object('date', date, 'total', total, 'total2', total2) ORDER BY date) AS daily_totals,
    MAX(CASE WHEN date = '2022-01-03' THEN total ELSE 0 END) AS total_on_specific_date
  FROM daily_totals
  GROUP BY contact_id
)
SELECT
  *
FROM aggregated_daily_totals
ORDER BY total_on_specific_date DESC;