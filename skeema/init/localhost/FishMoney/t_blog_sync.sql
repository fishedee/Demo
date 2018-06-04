CREATE TABLE `t_blog_sync` (
  `blogSyncId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `accessToken` varchar(1024) NOT NULL,
  `gitUrl` varchar(1024) NOT NULL,
  `syncType` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `stateMessage` varchar(10240) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blogSyncId`),
  KEY `stateIndex` (`userId`,`state`),
  KEY `syncTypeIndex` (`userId`,`syncType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
