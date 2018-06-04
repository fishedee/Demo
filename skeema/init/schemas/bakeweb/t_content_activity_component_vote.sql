CREATE TABLE `t_content_activity_component_vote` (
  `contentActivityComponentVoteId` int(11) NOT NULL AUTO_INCREMENT,
  `contentActivityComponentId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentActivityComponentVoteId`),
  KEY `clientIdAndContentActivityComponentIdIndex` (`contentActivityComponentId`,`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
