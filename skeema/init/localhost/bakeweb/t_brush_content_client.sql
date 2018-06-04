CREATE TABLE `t_brush_content_client` (
  `brushContentClientId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `operation` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `brushCommentId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`brushContentClientId`),
  KEY `clientIdIndex` (`clientId`),
  KEY `contentIdIndex` (`contentId`),
  KEY `clientIdAndContentIdIndex` (`clientId`,`contentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
