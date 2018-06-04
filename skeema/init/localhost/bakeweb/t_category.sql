CREATE TABLE `t_category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `sort` int(11) NOT NULL,
  `style` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `moreLink` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`),
  KEY `titleIndex` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
