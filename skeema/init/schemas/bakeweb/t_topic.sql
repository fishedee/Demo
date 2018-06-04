CREATE TABLE `t_topic` (
  `topicId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `introduce` varchar(2056) NOT NULL,
  `sort` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topicId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
