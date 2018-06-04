CREATE TABLE `t_remind` (
  `remindId` int(11) NOT NULL AUTO_INCREMENT,
  `receiveClientId` int(11) NOT NULL,
  `sendClientId` int(11) NOT NULL,
  `text` varchar(256) NOT NULL,
  `id` int(11) NOT NULL,
  `remindType` int(11) NOT NULL,
  `isRead` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`remindId`),
  KEY `receiveClientIdIndex` (`receiveClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
