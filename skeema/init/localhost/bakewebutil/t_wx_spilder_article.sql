CREATE TABLE `t_wx_spilder_article` (
  `wxSpilderArticleId` int(11) NOT NULL AUTO_INCREMENT,
  `msgId` bigint(20) NOT NULL,
  `fileId` bigint(20) NOT NULL,
  `publicId` varchar(128) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `readNum` int(11) NOT NULL,
  `likeNum` int(11) NOT NULL,
  `publishTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`wxSpilderArticleId`),
  UNIQUE KEY `fileIdIndex` (`fileId`),
  KEY `publicIdIndex` (`publicId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
