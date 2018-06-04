CREATE TABLE `t_weixin_rule` (
  `weixinRuleId` int(11) NOT NULL AUTO_INCREMENT,
  `inputWord` varchar(256) NOT NULL,
  `matchType` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`weixinRuleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
