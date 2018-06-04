CREATE TABLE `t_client_password_try` (
  `clientPassowrdTryId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientPassowrdTryId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
