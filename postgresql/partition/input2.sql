drop schema public cascade;
create schema public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
set search_path to public;

CREATE TABLE student (
  id BIGINT NOT NULL,
  tenant_id INTEGER NOT NULL,
  age integer not null,
  name VARCHAR(100) NOT NULL,
  money integer not null,
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

INSERT INTO student (id, tenant_id,age,money, name)
SELECT
  g.id,
  (g.id % 1001) AS tenant_id, -- 确保 tenant_id 在 0 到 1000 之间
  g.id % 120,
  g.id % 1000,
  'Student' || (g.id % 1000) AS name -- 随机生成名字
FROM generate_series(1, 100000) AS g(id);

-- 情况1：
-- 分区索引，有分区键。没有global关键字，每个分区上都有一个对应的索引匹配
create index student_age on student(tenant_id,age) ;

-- 无分区键的时候，会对每个子表进行seq筛选
explain select * from student where age = 10;

-- 有分区键的时候，直接走单个索引,student_7_tenant_id_age_idx
explain select * from student where age = 10  and tenant_id = 20;

-- 情况2：
-- 分区索引，没有分区键，没有global关键字，每个分区上都有一个对应的索引匹配
create index student_money on student(money) ;

-- 无分区键的时候，会对所有的索引进行Bitmap Index Scan
explain select * from student where money = 20;

-- 有分区键的时候，直接走单个索引,student_7_money_idx
explain select * from student where money = 30  and tenant_id = 20;

-- 情况3：
-- Postgresql上不支持使用global index，索引都是与每个表对应的。以下操作会报错
-- 错误:  unique constraint on partitioned table must include all partitioning columns
-- 描述:  表"student"上的约束UNIQUE缺少列"tenant_id"，该列是分区键的一部分.
create unique index student_name on student(name);
