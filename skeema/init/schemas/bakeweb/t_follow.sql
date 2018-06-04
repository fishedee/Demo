CREATE TABLE `t_follow` (
  `followId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `followClientId` int(11) NOT NULL,
  `isFollow` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`followId`),
  KEY `clientIdIndex` (`clientId`),
  KEY `followClientIdIndex` (`followClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
