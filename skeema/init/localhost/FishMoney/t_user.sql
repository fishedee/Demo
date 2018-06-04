CREATE TABLE `t_user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(32) NOT NULL,
  `password` char(48) NOT NULL,
  `type` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  KEY `nameIndex` (`name`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
