CREATE TABLE `t_client_medal` (
  `clientMedalId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `medalId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientMedalId`),
  KEY `clientIdIndex` (`clientId`),
  KEY `medalIdIndex` (`medalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
