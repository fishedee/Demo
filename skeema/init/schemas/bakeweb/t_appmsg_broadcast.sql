CREATE TABLE `t_appmsg_broadcast` (
  `appmsgBroadcastId` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(256) NOT NULL,
  `deviceType` int(11) NOT NULL,
  `afterOpenType` int(11) NOT NULL,
  `afterOpenData` varchar(256) NOT NULL,
  `state` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`appmsgBroadcastId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
