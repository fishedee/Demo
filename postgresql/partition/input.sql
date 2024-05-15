drop schema public cascade;
create schema public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
set search_path to public;

/*https://zhuanlan.zhihu.com/p/690917866*/

create table student(
	id bigint not null,
	tenant_id integer not null,
	name varchar(100) not null,
	/*must have id and partition id*/
	primary key(tenant_id,id)
) partition by range(tenant_id);

CREATE TABLE student_10 PARTITION OF student
    FOR VALUES FROM (0) TO (10);

CREATE TABLE student_20 PARTITION OF student
    FOR VALUES FROM (10) TO (20);

/*default partition*/
CREATE TABLE student_default PARTITION OF student default;

CREATE INDEX ON student (name);

insert into student(id,tenant_id,name)values
(1,1,'fish1'),
(2,1,'fish2'),
(3,2,'fish3'),
(4,2,'fish4'),
(5,11,'fish5'),
(6,11,'fish6'),
(7,12,'fish7'),
(8,12,'fish8'),
(9,103,'fish9'),
(10,103,'fish10');

select * from student;

select * from student_10;

select * from student_20;

select * from student_default;

/* add column*/
alter table student add column age integer not null default 0;
CREATE UNIQUE INDEX student_name ON student(tenant_id,name);

/* duplicate name*/
insert into student(id,tenant_id,name,age)values
(7,1,'fish1',10);

/* global index */
create index student_name2 on student(name);

/* change to only 2 partition*/
ALTER TABLE student DETACH PARTITION  student_10;
ALTER TABLE student DETACH PARTITION  student_20;

CREATE TABLE student_1 PARTITION OF student
    FOR VALUES FROM (0) TO (2);
CREATE TABLE student_2 PARTITION OF student
    FOR VALUES FROM (2) TO (20);

INSERT INTO student SELECT * FROM student_10;
INSERT INTO student SELECT * FROM student_20;
drop table student_10;
drop table student_20;

select * from student;

\d+ student;

/*https://zhuanlan.zhihu.com/p/117275290*/
/*https://developer.aliyun.com/article/590356*/
show enable_partition_pruning ;




