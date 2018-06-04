CREATE TABLE `t_client` (
  `clientId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `gender` int(11) NOT NULL,
  `image` varchar(256) NOT NULL,
  `openId` varchar(256) NOT NULL,
  `unionId` varchar(256) NOT NULL,
  `district` varchar(256) NOT NULL,
  `mail` varchar(256) NOT NULL,
  `sign` varchar(2056) NOT NULL,
  `year` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `phone` char(11) NOT NULL,
  `ip` varchar(64) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientId`),
  KEY `phoneIndex` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
