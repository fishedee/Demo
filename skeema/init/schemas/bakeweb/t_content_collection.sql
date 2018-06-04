CREATE TABLE `t_content_collection` (
  `contentCollectionId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `introduce` varchar(2056) NOT NULL,
  `style` int(11) NOT NULL,
  PRIMARY KEY (`contentCollectionId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
