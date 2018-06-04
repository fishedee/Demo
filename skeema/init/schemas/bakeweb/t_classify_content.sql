CREATE TABLE `t_classify_content` (
  `classifyContentId` int(11) NOT NULL AUTO_INCREMENT,
  `classifyId` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `contentType` int(11) NOT NULL,
  `hotNum` double NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`classifyContentId`),
  KEY `classifyIdAndContentTypeIndex` (`classifyId`,`contentType`),
  KEY `contentIdIndex` (`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
