CREATE TABLE `t_popularSearch` (
  `popularSearchId` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(256) NOT NULL,
  `sort` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`popularSearchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
