CREATE TABLE `t_account` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` char(32) NOT NULL,
  `money` int(11) NOT NULL,
  `remark` varchar(128) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `cardId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountId`),
  KEY `userIdIndex` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
