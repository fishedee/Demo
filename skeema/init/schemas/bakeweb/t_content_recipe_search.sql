CREATE TABLE `t_content_recipe_search` (
  `contentRecipeSearchId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `clientName` varchar(256) NOT NULL,
  `classifyId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `material` varchar(256) NOT NULL,
  `hotNum` double NOT NULL,
  `easyNum` double NOT NULL,
  `beautyNum` double NOT NULL,
  `createTimestamp` bigint(20) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentRecipeSearchId`),
  UNIQUE KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
