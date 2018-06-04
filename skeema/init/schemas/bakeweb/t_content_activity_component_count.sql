CREATE TABLE `t_content_activity_component_count` (
  `contentActivityComponentCountId` int(11) NOT NULL AUTO_INCREMENT,
  `activityContentId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentActivityComponentCountId`),
  UNIQUE KEY `activityAndClientIndex` (`activityContentId`,`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
