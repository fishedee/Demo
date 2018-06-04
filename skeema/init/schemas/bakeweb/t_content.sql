CREATE TABLE `t_content` (
  `contentId` int(11) NOT NULL AUTO_INCREMENT,
  `coverTitle` varchar(256) NOT NULL,
  `coverImage` varchar(256) NOT NULL,
  `coverSummary` varchar(2056) NOT NULL,
  `prefixTitle` varchar(256) NOT NULL,
  `clientId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `hotNum` double NOT NULL,
  `easyNum` double NOT NULL,
  `beautyNum` double NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
