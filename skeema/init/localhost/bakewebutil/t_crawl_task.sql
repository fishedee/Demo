CREATE TABLE `t_crawl_task` (
  `crawlTaskId` int(11) NOT NULL AUTO_INCREMENT,
  `crawlUrl` varchar(128) NOT NULL,
  `clientId` int(11) NOT NULL,
  `result` text NOT NULL,
  `state` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`crawlTaskId`),
  KEY `crawlUrlAndClientIdIndex` (`crawlUrl`,`clientId`),
  KEY `stateIndex` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
