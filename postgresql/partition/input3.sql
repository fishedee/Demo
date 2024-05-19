drop schema public cascade;
create schema public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
set search_path to public;

CREATE TABLE student (
  id BIGINT NOT NULL,
  tenant_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (tenant_id, id)
) PARTITION BY HASH (tenant_id);

CREATE OR REPLACE FUNCTION create_tenant_partitions(p_table_name TEXT, hash_count INTEGER)
RETURNS VOID AS $$
DECLARE
    v_partition_name TEXT;
    v_sql TEXT;
BEGIN
    FOR i IN 0..(hash_count-1) LOOP
        v_partition_name := format('%s_%s', p_table_name, i);

        v_sql := format('CREATE TABLE %s PARTITION OF %s FOR VALUES WITH (MODULUS %s, REMAINDER %s);', 
	        v_partition_name, 
	        p_table_name, 
	        hash_count, 
	        i);

        EXECUTE v_sql;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

select create_tenant_partitions('student',10);

-- 情况4：
-- 使用trigger来模拟实现global index
create table student_name(
  id BIGINT not null,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);
ALTER TABLE student_name add constraint student_name_unique unique(name)  DEFERRABLE INITIALLY DEFERRED;

create or replace function student_unique_name()
returns trigger as $$
declare
 rows smallint;
begin
    -- del old data
    if tg_op in ('DELETE', 'UPDATE') then
        delete from student_name 
        where id = old.id and name=old.name ;

        get diagnostics rows = row_count;
        if rows != 1 then 
            raise '% affected % rows (expected: 1)',tg_op, rows;
        end if;
    end if;
    

    -- add new data
    if tg_op in ('INSERT', 'UPDATE') then
        insert into student_name (id,name) 
        values (new.id, new.name);

        get diagnostics rows = row_count;
        if rows != 1 then 
            raise '% affected % rows (expected: 1)',tg_op, rows;
        end if;
    end if;

    return new;
end;
$$ language plpgsql;

create trigger student_unique_name
after delete or insert or update of id, name
on student for each row
execute function student_unique_name();

-- 初始数据
begin transaction;
delete from student_name;
insert into student_name select id, name from student;
end;

-- 测试数据
begin transaction;
insert into student(id,tenant_id,name)values
(1,10001,'fish'),
(2,10002,'cat'),
(3,10003,'dog');

select * from student_name;

update student set name = 'cat2' where id = 2;

update student set name = 'fish1',id = 4 where id = 1;

delete from student where id = 3;

select * from student_name;
end;

-- 测试冲突
begin transaction;

delete from student;

insert into student(id,tenant_id,name)values
(1,10001,'fish'),
(2,10002,'cat'),
(3,10003,'dog');

update student set name = 'fish' where id = 2;

select 'try commit!';
end;