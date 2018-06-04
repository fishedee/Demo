CREATE TABLE `t_crawl_image` (
  `crawlImageId` int(11) NOT NULL AUTO_INCREMENT,
  `websiteImageUrl` varchar(128) NOT NULL,
  `ourImageUrl` varchar(256) NOT NULL,
  `ourCleanImageUrl` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`crawlImageId`),
  KEY `websiteImageUrlIndex` (`websiteImageUrl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
