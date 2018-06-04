CREATE TABLE `t_client_content_timeline` (
  `clientContentTimelineId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `contentType` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `contentCreateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientContentTimelineId`),
  UNIQUE KEY `clientIdAndContentIdIndex` (`clientId`,`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
