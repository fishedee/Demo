CREATE TABLE `t_content_dish` (
  `contentDishId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `introduce` varchar(2056) NOT NULL,
  `parentContentId` int(11) NOT NULL,
  PRIMARY KEY (`contentDishId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
