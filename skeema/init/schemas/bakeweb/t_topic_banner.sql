CREATE TABLE `t_topic_banner` (
  `topicBannerId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `link` varchar(256) NOT NULL,
  `remark` varchar(256) NOT NULL,
  `sort` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topicBannerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
