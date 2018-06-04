CREATE TABLE `t_register` (
  `registerId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `beginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `mail` varchar(128) NOT NULL,
  `needDealType` int(11) NOT NULL,
  `haveDealType` int(11) NOT NULL,
  `haveDealResult` varchar(1024) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`registerId`),
  KEY `nameIndex` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
