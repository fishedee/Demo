# sudo apt-get install postgresql-14-mysql-fdw

create extension mysql_fdw;

CREATE SERVER mysql_server2
FOREIGN DATA WRAPPER mysql_fdw
OPTIONS (host '127.0.0.1', port '3306');

CREATE USER MAPPING FOR postgres
SERVER mysql_server2
OPTIONS (username 'fish', password '123');

CREATE FOREIGN TABLE w_sample_mysql (
    id varchar(255),
    unit_id bigint,
    patient_id varchar(255),
    sampling_time timestamp,
    send_check_time timestamp,
    verify_time timestamp
)SERVER mysql_server2 OPTIONS(dbname 'test', table_name 'w_sample');

CREATE FOREIGN TABLE w_sample_result_mysql (
    id bigint,
    sample_id varchar(255),
    instrument_type bigint,
    project_id bigint
)SERVER mysql_server2 OPTIONS(dbname 'test', table_name 'w_sample_result');

# 打开记录时间
 \timing

# 执行操作，2.4秒
with t as(
	with ts as(
		select
		s.id, s.unit_id, s.patient_id, s.sampling_time, s.send_check_time, s.verify_time,
		(s.sampling_time- s.verify_time) as tat,
		(s.sampling_time- s.send_check_time) as precheck_tat,
		(s.send_check_time- s.verify_time) as checking_tat
		from w_sample_mysql s
	)
	select
		s.id, s.unit_id, s.patient_id, s.sampling_time, s.send_check_time, s.verify_time, 
		s.tat, s.precheck_tat,s.checking_tat,sr.id as result_id, sr.instrument_type, sr.project_id,
		count(*) over(partition by sr.instrument_type, sr.project_id) as pcount,
		row_number() over (partition by sr.instrument_type, sr.project_id order by s.tat asc)as rownum,
		row_number() over (partition by sr.instrument_type, sr.project_id order by s.precheck_tat asc)as precheck_rownum,
		row_number() over (partition by sr.instrument_type, sr.project_id order by s.checking_tat asc)as checking_rownum
	from w_sample_result_mysql sr
	join ts s on sr.sample_id= s.id
)
select * from t limit 100;

/*
* 优化1，直接使用postgresql来一步计算中位数和平均数，不需要排序，不需要开窗
* 执行时间2.1秒
*/
with t as(
	with ts as(
		select
		s.id, sr.instrument_type, sr.project_id,
		(s.sampling_time- s.verify_time) as tat,
		(s.sampling_time- s.send_check_time) as precheck_tat,
		(s.send_check_time- s.verify_time) as checking_tat
		from w_sample_mysql as s left join w_sample_result_mysql as sr on sr.sample_id= s.id
	)
	select instrument_type,project_id,
		percentile_cont(0.5) within group (order by tat) as median_tat,
		avg(tat) as avg_tat,
		percentile_cont(0.5) within group (order by precheck_tat) as median_precheck,
		avg(precheck_tat) as avg_precheck,
		percentile_cont(0.5) within group (order by checking_tat) as checking_tat,
		avg(checking_tat) as checking_tat
	from ts
	group by instrument_type,project_id
)
select * from t limit 100;