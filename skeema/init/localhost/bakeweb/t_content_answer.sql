CREATE TABLE `t_content_answer` (
  `contentAnswerId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `questionContentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `hotNum` double NOT NULL,
  PRIMARY KEY (`contentAnswerId`),
  KEY `contentIdIndex` (`contentId`),
  KEY `questionContentIdIndex` (`questionContentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
