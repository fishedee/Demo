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
