CREATE TABLE `t_category_item` (
  `categoryItemId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `introduce` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `link` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryItemId`),
  KEY `categoryIdIndex` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
