CREATE TABLE `t_block` (
  `blockId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `ip` varchar(128) NOT NULL,
  `image` varchar(256) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blockId`),
  KEY `clientIdIndex` (`clientId`),
  KEY `ipIndex` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
