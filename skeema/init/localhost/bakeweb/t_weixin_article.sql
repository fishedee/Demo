CREATE TABLE `t_weixin_article` (
  `weixinArticleId` int(11) NOT NULL AUTO_INCREMENT,
  `weixinRuleId` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `description` varchar(256) NOT NULL,
  `picUrl` varchar(256) NOT NULL,
  `url` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`weixinArticleId`),
  KEY `titleIndex` (`title`),
  KEY `weixinRuleIdIndex` (`weixinRuleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
