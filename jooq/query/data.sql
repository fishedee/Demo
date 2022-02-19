drop database if exists `library`;
CREATE DATABASE `library`;

USE `library`;

CREATE TABLE `country` (
      `id` int NOT NULL,
      `name` varchar(255) DEFAULT NULL,
      `man_count` int DEFAULT NULL,
      PRIMARY KEY (`id`)
)engine=innodb charset=utf8mb4 auto_increment = 10001;


CREATE TABLE `people` (
      `id` int NOT NULL,
      `name` varchar(255) DEFAULT NULL,
      `country_id` int DEFAULT NULL,
      PRIMARY KEY (`id`)
)engine=innodb charset=utf8mb4 auto_increment = 10001;