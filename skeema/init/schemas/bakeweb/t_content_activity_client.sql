CREATE TABLE `t_content_activity_client` (
  `contentActivityClientId` int(11) NOT NULL AUTO_INCREMENT,
  `activityContentId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `isShowRank` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentActivityClientId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
