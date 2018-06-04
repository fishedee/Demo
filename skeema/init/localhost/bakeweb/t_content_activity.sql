CREATE TABLE `t_content_activity` (
  `contentActivityId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `introduce` varchar(2056) NOT NULL,
  `activityIntroduce` text NOT NULL,
  `activityPrefixTitle` varchar(256) NOT NULL,
  `activityAwardLink` varchar(256) NOT NULL,
  `activityAwardType` int(11) NOT NULL,
  `activityType` int(11) NOT NULL,
  `activityNormalVotePrecent` int(11) NOT NULL,
  `activityBeginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activityEndTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activityApplyText` varchar(2056) NOT NULL,
  PRIMARY KEY (`contentActivityId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
