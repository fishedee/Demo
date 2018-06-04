CREATE TABLE `t_wx_spilder_account` (
  `wxSpilderAccountId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `publicId` varchar(64) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`wxSpilderAccountId`),
  KEY `publicIdIndex` (`publicId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
