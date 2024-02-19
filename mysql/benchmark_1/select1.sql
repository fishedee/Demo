with t as(
	with ts as(
		select
		s.id, s.unit_id, s.patient_id, s.sampling_time, s.send_check_time, s.verify_time,
		TIMESTAMPDIFF(MINUTE,s.sampling_time, s.verify_time) as tat,
		TIMESTAMPDIFF(MINUTE, s.sampling_time, s.send_check_time) as precheck_tat,
		TIMESTAMPDIFF(MINUTE, s.send_check_time, s.verify_time) as checking_tat
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

select count(*) from w_sample;

select count(*) from w_sample_result;
