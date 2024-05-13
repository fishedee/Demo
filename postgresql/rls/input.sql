drop schema public cascade;
create schema public;
drop  user t1;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;


set search_path to public;

create table operator(
	id bigint not null,
	tenant_id bigint not null,
	name varchar(64) not null,
	primary key(id)
);

alter table operator add constraint name_unique unique(name,tenant_id) deferrable initially deferred ;

insert into operator(id,tenant_id,name)values
(1,10001,'fish'),
(2,10001,'fish2'),
(3,10002,'fish'),
(4,10002,'fish2');

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
GRANT ALL on TABLE operator to t1;