CREATE TABLE `t_client_bind` (
  `clientBindId` int(11) NOT NULL AUTO_INCREMENT,
  `masterClientId` int(11) NOT NULL,
  `slaveClientId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientBindId`),
  KEY `masterClientIdIndex` (`masterClientId`),
  KEY `slaveClientIdIndex` (`slaveClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
