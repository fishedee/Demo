/*测试*/
SET app.tenant_id = 10001;
show app.tenant_id;
select * from operator;

insert into operator(id,name)values
(6,'fish6');

/*dupliate name fish*/
insert into operator(id,name)values
(7,'fish');

update operator set name = 'fish22' where id = 2;

delete from operator where id = 1;

select * from operator;

select * from config;

update config set value = '10GB' where name = 'maxDiskSpace';

/*测试2*/
SET app.tenant_id = 10002;

/*can not delete data of other tenant*/
delete from operator where id = 2;

/*can not update data of other tenant*/
update operator set name = 'fish222' where id = 2;

/*can add date with the same name of other tenant*/
insert into operator(id,name)values
(8,'fish6');

select * from operator;

select * from config;
