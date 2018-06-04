CREATE TABLE `t_content_item` (
  `contentItemId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `link` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `payPrice` decimal(12,2) NOT NULL,
  `originPrice` decimal(12,2) NOT NULL,
  PRIMARY KEY (`contentItemId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
