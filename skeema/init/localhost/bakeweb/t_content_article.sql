CREATE TABLE `t_content_article` (
  `contentArticleId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `summary` varchar(2056) NOT NULL,
  `remark` varchar(256) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`contentArticleId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
