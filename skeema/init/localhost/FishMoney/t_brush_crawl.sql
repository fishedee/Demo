CREATE TABLE `t_brush_crawl` (
  `brushCrawlId` int(11) NOT NULL AUTO_INCREMENT,
  `brushTaskId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `proxy` varchar(128) NOT NULL,
  `retryNum` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `stateMessage` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`brushCrawlId`),
  KEY `brushTaskIdIndex` (`brushTaskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
