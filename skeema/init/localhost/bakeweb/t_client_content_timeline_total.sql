CREATE TABLE `t_client_content_timeline_total` (
  `clientContentTimelineTotalId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `dishNum` int(11) NOT NULL,
  `questionAndAnswerNum` int(11) NOT NULL,
  `recipeNum` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientContentTimelineTotalId`),
  UNIQUE KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
