CREATE TABLE `t_config` (
  `configId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `value` varchar(10240) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`configId`),
  KEY `nameIndex` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
