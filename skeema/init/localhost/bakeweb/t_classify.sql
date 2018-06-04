CREATE TABLE `t_classify` (
  `classifyId` int(11) NOT NULL AUTO_INCREMENT,
  `parentClassifyId` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `prefixTitle` varchar(256) NOT NULL,
  `remark` varchar(256) NOT NULL,
  `briefNum` int(11) NOT NULL,
  `image` varchar(256) NOT NULL,
  `sort` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`classifyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
