CREATE TABLE `t_appmsg_unicast` (
  `appmsgUnicastId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `deviceType` int(11) NOT NULL,
  `deviceToken` varchar(256) NOT NULL,
  `taskId` varchar(256) NOT NULL,
  `messageType` int(11) NOT NULL,
  `message` varchar(256) NOT NULL,
  `afterOpenType` int(11) NOT NULL,
  `afterOpenData` varchar(256) NOT NULL,
  `state` int(11) NOT NULL,
  `stateMessage` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`appmsgUnicastId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
