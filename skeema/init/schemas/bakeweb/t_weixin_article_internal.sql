CREATE TABLE `t_weixin_article_internal` (
  `weixinArticleInternalId` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(128) NOT NULL,
  `messageCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`weixinArticleInternalId`),
  KEY `openIdAndMessageCreateTimeIndex` (`openId`,`messageCreateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
