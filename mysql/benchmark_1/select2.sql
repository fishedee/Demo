drop table if exists w_sample2;

drop table if exists w_sample_result2;

CREATE TABLE w_sample2 (
    id varchar(255),
    unit_id bigint,
    patient_id varchar(255),
    sampling_time timestamp,
    send_check_time timestamp,
    verify_time timestamp,
    primary key(id)
)engine=innodb;

CREATE TABLE w_sample_result2(
    id bigint,
    sample_id varchar(255),
    instrument_type bigint,
    project_id bigint,
     primary key(id)
)engine=innodb;

insert into w_sample2 select id,unit_id,patient_id,sampling_time,send_check_time,verify_time from w_sample;

insert into w_sample_result2 select id,sample_id,instrument_type,project_id from w_sample_result;

alter table w_sample_result2 add index(sample_id);

alter table w_sample_result2 add index(instrument_type,project_id);

with t as (
    with ts as(
        select
        s.id, sr.instrument_type, sr.project_id,
        CONCAT(sr.instrument_type,'#',sr.project_id) as group_key,
        s.sampling_time - s.verify_time as tat,
        s.sampling_time - s.send_check_time as precheck_tat,
        s.send_check_time - s.verify_time as checking_tat
        from w_sample2 as s left join w_sample_result2 as sr on sr.sample_id = s.id
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
