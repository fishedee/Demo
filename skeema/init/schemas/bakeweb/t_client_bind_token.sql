CREATE TABLE `t_client_bind_token` (
  `clientBindTokenId` int(11) NOT NULL AUTO_INCREMENT,
  `masterClientId` int(11) NOT NULL,
  `token` varchar(128) NOT NULL,
  `unionId` varchar(128) NOT NULL,
  `type` int(11) NOT NULL,
  `clientInfo` text NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientBindTokenId`),
  KEY `masterClientIdIndex` (`masterClientId`),
  KEY `tokenIndex` (`token`),
  KEY `masterAndTypeAndUnionIdIndex` (`masterClientId`,`type`,`unionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
