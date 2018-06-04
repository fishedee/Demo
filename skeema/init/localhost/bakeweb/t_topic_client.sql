CREATE TABLE `t_topic_client` (
  `topicClientId` int(11) NOT NULL AUTO_INCREMENT,
  `topicId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topicClientId`),
  KEY `topicIdIndex` (`topicId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
