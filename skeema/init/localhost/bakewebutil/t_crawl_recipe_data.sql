CREATE TABLE `t_crawl_recipe_data` (
  `crawlRecipeDataId` int(11) NOT NULL AUTO_INCREMENT,
  `websiteType` int(11) NOT NULL,
  `websiteUserId` varchar(128) NOT NULL,
  `websiteRecipeId` int(11) NOT NULL,
  `websiteData` text NOT NULL,
  `ourRecipeId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`crawlRecipeDataId`),
  KEY `websiteTypeAndWebsiteUserIdIndex` (`websiteType`,`websiteUserId`),
  KEY `websiteTypeIndex` (`websiteType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
