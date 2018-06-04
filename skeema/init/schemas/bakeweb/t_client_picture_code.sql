CREATE TABLE `t_client_picture_code` (
  `clientPictureCodeId` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(128) NOT NULL,
  `pictureCode` char(4) NOT NULL,
  `pictureCodeId` varchar(128) NOT NULL,
  `isValid` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientPictureCodeId`),
  KEY `ipIndex` (`ip`),
  KEY `pictureCodeIndex` (`pictureCode`),
  KEY `pictureCodeIdIndex` (`pictureCodeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
