CREATE TABLE `t_invite_question` (
  `inviteQuestionId` int(11) NOT NULL AUTO_INCREMENT,
  `sendClientId` int(11) NOT NULL,
  `receiveClientId` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inviteQuestionId`),
  KEY `sendClientIdIndex` (`sendClientId`),
  KEY `receiveClientIdIndex` (`receiveClientId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
