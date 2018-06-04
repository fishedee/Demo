CREATE TABLE `t_brush_comment` (
  `brushCommentId` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(128) NOT NULL,
  `type` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`brushCommentId`),
  KEY `textIndex` (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
