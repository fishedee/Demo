CREATE TABLE `t_content_client` (
  `contentClientId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `contentType` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `visitNum` int(11) NOT NULL,
  `visitTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likeNum` int(11) NOT NULL,
  `likeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shareNum` int(11) NOT NULL,
  `shareTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `collectNum` int(11) NOT NULL,
  `collectTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentClientId`),
  UNIQUE KEY `contentClientIndex` (`contentId`,`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
