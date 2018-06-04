CREATE TABLE `t_keyword` (
  `keywordId` int(11) NOT NULL AUTO_INCREMENT,
  `normalKeyword` varchar(128) NOT NULL,
  `specialKeyword` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`keywordId`),
  KEY `normalKeywordIndex` (`normalKeyword`),
  KEY `specialKeywordIndex` (`specialKeyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
