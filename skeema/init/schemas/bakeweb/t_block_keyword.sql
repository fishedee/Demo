CREATE TABLE `t_block_keyword` (
  `blockKeywordId` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blockKeywordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
