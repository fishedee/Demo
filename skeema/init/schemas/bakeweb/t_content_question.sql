CREATE TABLE `t_content_question` (
  `contentQuestionId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `answerNum` int(11) NOT NULL,
  PRIMARY KEY (`contentQuestionId`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
