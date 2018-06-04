CREATE TABLE `t_content_comment` (
  `contentCommentId` int(11) NOT NULL AUTO_INCREMENT,
  `contentId` int(11) NOT NULL,
  `text` varchar(2056) NOT NULL,
  `image` varchar(256) NOT NULL,
  `commentContentId` int(11) NOT NULL,
  `commentClientId` int(11) NOT NULL,
  `rootCommentContentId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentCommentId`),
  KEY `contentIdIndex` (`contentId`),
  KEY `rootCommentContentIdIndex` (`rootCommentContentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
