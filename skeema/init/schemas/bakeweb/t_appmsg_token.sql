CREATE TABLE `t_appmsg_token` (
  `appmsgTokenId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `deviceType` int(11) NOT NULL,
  `deviceToken` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`appmsgTokenId`),
  UNIQUE KEY `clientIdAndDeviceTypeIndex` (`clientId`,`deviceType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
