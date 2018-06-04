CREATE TABLE `t_topic_floor` (
  `topicFloorId` int(11) NOT NULL AUTO_INCREMENT,
  `parentTopicFloorId` int(11) NOT NULL,
  `topicPostId` int(11) NOT NULL,
  `floorNum` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `text` varchar(2056) NOT NULL,
  `image` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topicFloorId`),
  KEY `topicPostIdIndex` (`topicPostId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
