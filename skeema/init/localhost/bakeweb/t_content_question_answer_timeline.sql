CREATE TABLE `t_content_question_answer_timeline` (
  `contentQuestionAnswerTimelineId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `operation` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `answerNum` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentQuestionAnswerTimelineId`),
  UNIQUE KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
