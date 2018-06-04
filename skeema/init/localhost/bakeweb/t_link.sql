CREATE TABLE `t_link` (
  `linkId` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `link` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`linkId`),
  KEY `linkIdIndex` (`linkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
