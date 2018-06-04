CREATE TABLE `t_blog_sync_auto` (
  `blogSyncAutoId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `accessToken` varchar(1024) NOT NULL,
  `gitUrl` varchar(1024) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blogSyncAutoId`),
  KEY `userIdIndex` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
