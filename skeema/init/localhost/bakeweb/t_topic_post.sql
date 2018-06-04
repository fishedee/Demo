CREATE TABLE `t_topic_post` (
  `topicPostId` int(11) NOT NULL AUTO_INCREMENT,
  `topicId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `type` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `floorNum` int(11) NOT NULL,
  `lastReplyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topicPostId`),
  KEY `topicIdIndex` (`topicId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
