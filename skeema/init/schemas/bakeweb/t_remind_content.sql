CREATE TABLE `t_remind_content` (
  `remindContentId` int(11) NOT NULL AUTO_INCREMENT,
  `remindId` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`remindContentId`),
  KEY `remindIdIndex` (`remindId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
