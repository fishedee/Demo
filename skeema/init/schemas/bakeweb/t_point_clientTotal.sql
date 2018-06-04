CREATE TABLE `t_point_clientTotal` (
  `pointClientTotalId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `increasePoint` int(11) NOT NULL,
  `decreasePoint` int(11) NOT NULL,
  `exchangePoint` int(11) NOT NULL,
  `day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pointClientTotalId`),
  UNIQUE KEY `clientIdAndDayIndex` (`clientId`,`day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
