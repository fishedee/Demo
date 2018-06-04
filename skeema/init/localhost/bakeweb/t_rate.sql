CREATE TABLE `t_rate` (
  `rateId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `version` varchar(128) NOT NULL,
  `times` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `ignoreTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rateId`),
  KEY `clientIdAndTypeAndVersionIndex` (`clientId`,`type`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
