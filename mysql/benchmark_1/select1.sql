# 原始，运行时间6.01秒
with t as(
	with ts as(
		select
		s.id, s.unit_id, s.patient_id, s.sampling_time, s.send_check_time, s.verify_time,
		TIMESTAMPDIFF(MINUTE,s.sampling_time, s.verify_time) as tat,
		TIMESTAMPDIFF(MINUTE,s.sampling_time, s.send_check_time) as precheck_tat,
		TIMESTAMPDIFF(MINUTE,s.send_check_time, s.verify_time) as checking_tat
		from w_sample s
	)
	select
		s.id, s.unit_id, s.patient_id, s.sampling_time, s.send_check_time, s.verify_time, 
		s.tat, s.precheck_tat,s.checking_tat,sr.id as result_id, sr.instrument_type, sr.project_id,
		count(*) over(partition by sr.instrument_type, sr.project_id) as pcount,
		row_number() over (partition by sr.instrument_type, sr.project_id order by s.tat asc)as rownum,
		row_number() over (partition by sr.instrument_type, sr.project_id order by s.precheck_tat asc)as precheck_rownum,
		row_number() over (partition by sr.instrument_type, sr.project_id order by s.checking_tat asc)as checking_rownum
	from w_sample_result sr
	join ts s on sr.sample_id= s.id
)
select * from t limit 100;

# 优化1，先更改列类型，再运行以后，10.2秒
alter table w_sample change column sampling_time sampling_time timestamp not null;
alter table w_sample change column verify_time verify_time timestamp not null;
alter table w_sample change column send_check_time send_check_time timestamp not null;

# 优化2，提前join，然后再计算count和row_number, 5.22秒
with t as (
	with ts as(
		select
		s.id, sr.instrument_type, sr.project_id,
		CONCAT(sr.instrument_type,'#',sr.project_id) as group_key,
		s.sampling_time - s.verify_time as tat,
		s.sampling_time - s.send_check_time as precheck_tat,
		s.send_check_time - s.verify_time as checking_tat
		from w_sample as s left join w_sample_result as sr on sr.sample_id = s.id
	)
	select
		ts.id,
		count(*) over(partition by ts.group_key) as pcount,
		row_number() over (partition by ts.group_key order by ts.tat asc)as rownum,
		row_number() over (partition by ts.group_key order by ts.precheck_tat asc)as precheck_rownum,
		row_number() over (partition by ts.group_key order by ts.checking_tat asc)as checking_rownum
	from ts
)
select * from t limit 100;
