CREATE TABLE `t_medal` (
  `medalId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `image` varchar(256) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `isHide` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`medalId`),
  KEY `nameIndex` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
