drop schema public cascade;
create schema public;
drop  user t1;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

set search_path to public;

create table config(
	id bigint not null,
	name varchar(64) not null,
	value varchar(64) not null,
	primary key(id)
);

insert into config(id,name,value)values
(1,'maxOperator','13'),
(2,'maxDiskSpace','1GB');

create table operator(
	id bigint not null,
	tenant_id bigint not null,
	name varchar(64) not null,
	primary key(tenant_id,id)
)partition by hash(tenant_id);

CREATE OR REPLACE FUNCTION create_tenant_partitions(p_table_name TEXT,hashCount INTEGER)
RETURNS VOID AS $$
DECLARE
    v_partition_name TEXT;
    v_sql TEXT;
BEGIN
    FOR i IN 0..(hashCount-1) LOOP

        v_partition_name := format('%s_%s', p_table_name,i);

        v_sql := format('CREATE TABLE %s PARTITION OF %s FOR VALUES WITH(MODULUS %s, REMAINDER %s)', 
        v_partition_name, p_table_name, hashCount, i);

        EXECUTE v_sql;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT create_tenant_partitions('operator',32);

alter table operator add constraint name_unique unique(name,tenant_id) deferrable initially deferred ;

insert into operator(id,tenant_id,name)values
(1,10001,'fish'),
(2,10001,'fish2'),
(3,11002,'fish'),
(4,11002,'fish2'),
(55,20001,'fish55'),
(56,20001,'fish56');

/*user表启用row level*/
alter table operator enable row level security;

/*DROP POLICY policy_name ON table_name;*/
CREATE POLICY tenant_isolation_policy ON operator
for all
USING (tenant_id = current_setting('app.tenant_id')::int);

ALTER TABLE operator ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id')::int;

/*查看policy*/
SELECT * FROM pg_policies;

/* create user*/
create user t1 with password '123';
GRANT ALL ON SCHEMA public TO t1; 
GRANT ALL on ALL TABLES in SCHEMA public to t1;

