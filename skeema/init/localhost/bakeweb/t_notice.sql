CREATE TABLE `t_notice` (
  `noticeId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `content` text NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`noticeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
