CREATE TABLE `t_classify_recommend` (
  `classifyRecommendId` int(11) NOT NULL AUTO_INCREMENT,
  `classifyId` int(11) NOT NULL,
  `link` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`classifyRecommendId`),
  KEY `classifyIdIndex` (`classifyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
