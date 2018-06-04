CREATE TABLE `t_invite_question_client` (
  `inviteQuestionClientId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `answerNum` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inviteQuestionClientId`),
  KEY `clientIdIndex` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
