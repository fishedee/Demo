CREATE TABLE `t_content_activity_component_draft` (
  `contentActivityComponentDraftId` int(11) NOT NULL AUTO_INCREMENT,
  `activityContentId` int(11) NOT NULL,
  `joinContentId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentActivityComponentDraftId`),
  KEY `activityContentIdAndJoinContentIdIndex` (`activityContentId`,`joinContentId`),
  KEY `joinContentIdIndex` (`joinContentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
