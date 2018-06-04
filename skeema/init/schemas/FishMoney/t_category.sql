CREATE TABLE `t_category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` char(32) NOT NULL,
  `remark` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`),
  KEY `userIdIndex` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
