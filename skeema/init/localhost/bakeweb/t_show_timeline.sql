CREATE TABLE `t_show_timeline` (
  `showTimelineId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `operation` int(11) NOT NULL,
  `hotNum` double NOT NULL,
  `contentCreateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`showTimelineId`),
  UNIQUE KEY `contentIdIndex` (`contentId`),
  KEY `operationIndex` (`operation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
