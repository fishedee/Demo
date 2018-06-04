CREATE TABLE `t_content_clientTotal` (
  `contentClientTotalId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `visitNum` int(11) NOT NULL,
  `likeNum` int(11) NOT NULL,
  `hateNum` int(11) NOT NULL,
  `shareNum` int(11) NOT NULL,
  `collectNum` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentClientTotalId`),
  UNIQUE KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
