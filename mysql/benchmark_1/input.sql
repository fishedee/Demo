drop database if exists test;

create database test;
use test;

CREATE TABLE `w_sample` (
  `id` varchar(255) NOT NULL,
  `sample_num` varchar(50) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `patient_id` varchar(255) DEFAULT NULL,
  `patient_type` varchar(255) DEFAULT NULL,
  `record_no` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_sex_id` varchar(255) DEFAULT NULL,
  `patient_sex` varchar(255) DEFAULT NULL,
  `patient_age` varchar(255) DEFAULT NULL,
  `patient_age_unit_id` varchar(255) DEFAULT NULL,
  `patient_age_unit` varchar(255) DEFAULT NULL,
  `department_id` varchar(255) DEFAULT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `bed_no` varchar(255) DEFAULT NULL,
  `diagnosis_id` varchar(255) DEFAULT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `sample_type_id` varchar(255) DEFAULT NULL,
  `sample_type_name` varchar(255) DEFAULT NULL,
  `send_check_user_id` varchar(255) DEFAULT NULL,
  `send_check_user_name` varchar(255) DEFAULT NULL,
  `application_no` varchar(255) DEFAULT NULL,
  `send_check_time` varchar(255) DEFAULT NULL,
  `sampling_time` varchar(255) DEFAULT NULL,
  `report_time` varchar(255) DEFAULT NULL,
  `check_user_id` varchar(255) DEFAULT NULL,
  `check_user_name` varchar(255) DEFAULT NULL,
  `verify_user_id` varchar(255) DEFAULT NULL,
  `verify_user_name` varchar(255) DEFAULT NULL,
  `cost_type_id` varchar(255) DEFAULT NULL,
  `cost_type_name` varchar(255) DEFAULT NULL,
  `unit_id` bigint unsigned DEFAULT NULL,
  `unit_name` varchar(255) DEFAULT NULL,
  `danger_status` int DEFAULT NULL,
  `urgent_status` int DEFAULT NULL,
  `audit_status` int DEFAULT NULL,
  `print_status` int DEFAULT NULL,
  `remind_status` int DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `check_time` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `sample_key` varchar(255) DEFAULT NULL,
  `acceptance_id` varchar(50) DEFAULT NULL,
  `create_date` char(10) NOT NULL DEFAULT '' COMMENT '样本日期',
  `new_sample_num` int DEFAULT NULL COMMENT '新样本号',
  `insert_time` datetime DEFAULT NULL COMMENT '入库时间',
  `is_push` tinyint(1) DEFAULT '0',
  `review_status` int DEFAULT '0',
  `review_time` varchar(50) DEFAULT '',
  `review_user_name` varchar(50) DEFAULT '',
  `verify_time` varchar(50) DEFAULT '',
  `verify_remark` varchar(500) DEFAULT NULL,
  `patient_user_id` varchar(255) DEFAULT NULL,
  `source` int NOT NULL DEFAULT '1' COMMENT '样本来源：1 仪器;2 界面;3 lis/his;',
  `danger_review_status` int DEFAULT '0' COMMENT '危急值审核状态 0-未审核 1-审核',
  `danger_review_comment` varchar(255) DEFAULT '' COMMENT '危急值审核内容',
  `danger_review_time` datetime DEFAULT NULL COMMENT '危急值审核时间',
  `danger_review_user_id` bigint DEFAULT NULL COMMENT '危急值审核用户ID',
  `danger_review_user_name` varchar(255) DEFAULT '' COMMENT '危急值审核用户',
  `review_remark` varchar(255) DEFAULT NULL,
  `test_item` varchar(255) DEFAULT NULL COMMENT '检验项目',
  `test_item_type` varchar(255) DEFAULT NULL COMMENT '检验项目类型',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `sampleno_unit_date_index` (`new_sample_num`,`unit_id`,`create_date`) USING BTREE,
  KEY `st_unit_id_index` (`unit_id`) USING BTREE,
  KEY `st_check_time_index` (`check_time`) USING BTREE,
  KEY `st_create_time_index` (`create_time`) USING BTREE,
  KEY `st_s_index` (`sample_num`) USING BTREE,
  KEY `st_patient_index` (`patient_id`) USING BTREE,
  KEY `idx_create_date` (`create_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

SET @last_id = 1;

INSERT INTO w_sample (id, sample_num, barcode, patient_id, patient_type, record_no, patient_name, patient_sex_id, patient_sex, patient_age, patient_age_unit_id, patient_age_unit, department_id, department_name, bed_no, diagnosis_id, diagnosis, sample_type_id, sample_type_name, send_check_user_id, send_check_user_name, application_no, send_check_time, sampling_time, report_time, check_user_id, check_user_name, verify_user_id, verify_user_name, cost_type_id, cost_type_name, unit_id, unit_name, danger_status, urgent_status, audit_status, print_status, remind_status, remark, check_time, create_time, update_time, sample_key, acceptance_id, create_date, new_sample_num, insert_time, is_push, review_status, review_time, review_user_name, verify_time, verify_remark, patient_user_id, source, danger_review_status, danger_review_comment, danger_review_time, danger_review_user_id, danger_review_user_name, review_remark, test_item, test_item_type)
SELECT 
    @last_id := @last_id+1,
    CONCAT('SAMPLE', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('BARCODE', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('PATIENT', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    'Type',
    CONCAT('RECORD', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('Patient', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    'SexID',
    'Sex',
    FLOOR(RAND() * 100) + 1,
    'AgeUnitID',
    'AgeUnit',
    CONCAT('DEPARTMENT', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('Department', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('BED', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('DIAGNOSIS', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    'Diagnosis',
    CONCAT('SampleTypeID', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('SampleTypeName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('User', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('UserName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('Application', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    CONCAT('CheckUser', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('CheckUserName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('VerifyUser', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('VerifyUserName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('CostTypeID', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('CostTypeName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    FLOOR(RAND() * 99999) + 1,
    CONCAT('UnitName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    FLOOR(RAND() * 2),
    FLOOR(RAND() * 2),
    FLOOR(RAND() * 2),
    FLOOR(RAND() * 2),
    FLOOR(RAND() * 2),
    CONCAT('Remark', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    CONCAT('SampleKey', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('Acceptance', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    DATE(NOW() - INTERVAL FLOOR(RAND() * 365) DAY),
    @last_id,
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    FLOOR(RAND() * 2),
    FLOOR(RAND() * 2),
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    CONCAT('ReviewUser', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    CONCAT('VerifyRemark', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('PatientUserID', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    FLOOR(RAND() * 3) + 1,
    FLOOR(RAND() * 2),
    CONCAT('DangerReviewComment', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
    FLOOR(RAND() * 99999) + 1,
    CONCAT('DangerReviewUser', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('ReviewRemark', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('TestItem', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
    CONCAT('TestItemType', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0'))
FROM
  information_schema.tables AS t1,
  information_schema.tables AS t2,
  information_schema.tables AS t3
limit 500000;


CREATE TABLE `w_sample_result` (
  `id` bigint unsigned NOT NULL,
  `sample_id` varchar(255) DEFAULT NULL,
  `project_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ch_name` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `result_suffix` varchar(255) DEFAULT NULL,
  `r_upper` varchar(255) DEFAULT NULL,
  `r_lower` varchar(255) DEFAULT NULL,
  `c_upper` varchar(255) DEFAULT NULL,
  `c_lower` varchar(255) DEFAULT NULL,
  `result_judgment` varchar(255) DEFAULT NULL,
  `decimal_digit` varchar(255) DEFAULT NULL,
  `units` varchar(255) DEFAULT NULL,
  `multi_ref` varchar(512) DEFAULT NULL,
  `enable_multi` tinyint DEFAULT NULL,
  `instrument_id` bigint unsigned DEFAULT NULL,
  `instrument_type` bigint unsigned DEFAULT NULL,
  `is_instrument` int DEFAULT NULL,
  `state` int DEFAULT NULL,
  `critical_state` int DEFAULT NULL,
  `check_time` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `result_backup` varchar(255) DEFAULT NULL,
  `is_push` tinyint(1) DEFAULT '0',
  `project_tat_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '项目TATid',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sr_sample_id_index` (`sample_id`) USING BTREE,
  KEY `sr_project_id_index` (`project_id`) USING BTREE,
  KEY `sr_result_index` (`result`) USING BTREE,
  KEY `sr_instrument_type_index` (`instrument_type`) USING BTREE,
  KEY `sr_check_time_index` (`check_time`) USING BTREE,
  KEY `idx_itype_pid` (`instrument_type`,`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;


SET @last_id = 1;

SET @last_id2 = 10001;

INSERT INTO w_sample_result (id, sample_id, project_id, name, ch_name, result, result_suffix, r_upper, r_lower, c_upper, c_lower, result_judgment, decimal_digit, units, multi_ref, enable_multi, instrument_id, instrument_type, is_instrument, state, critical_state, check_time, create_time, update_time, result_backup, is_push, project_tat_id)
SELECT
  @last_id2 := @last_id2 +1,
  @last_id := @last_id+1,
  FLOOR(RAND() * 100) + 1,
  CONCAT('ProjectName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('CHName', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Result', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Suffix', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Upper', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Lower', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Upper', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Lower', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Judgment', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Digit', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Unit', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  CONCAT('Ref', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  FLOOR(RAND() * 2),
  FLOOR(RAND() * 1000) + 1,
  FLOOR(RAND() * 1000) + 1,
  FLOOR(RAND() * 2),
  FLOOR(RAND() * 2),
  FLOOR(RAND() * 2),
  NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
  NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
  NOW() - INTERVAL FLOOR(RAND() * 365) DAY,
  CONCAT('ResultBackup', LPAD(FLOOR(RAND() * 99999) + 1, 5, '0')),
  FLOOR(RAND() * 2),
  FLOOR(RAND() * 99999) + 1
FROM
  information_schema.tables AS t1,
  information_schema.tables AS t2,
  information_schema.tables AS t3
limit 500000;