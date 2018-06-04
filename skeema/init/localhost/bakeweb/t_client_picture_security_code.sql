CREATE TABLE `t_client_picture_security_code` (
  `clientPictureSecurityCodeId` int(11) NOT NULL AUTO_INCREMENT,
  `pictureCodeId` varchar(128) NOT NULL,
  `pictureSecurityCode` varchar(128) NOT NULL,
  `isValid` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientPictureSecurityCodeId`),
  KEY `pictureCodeIdIndex` (`pictureCodeId`),
  KEY `pictureSecurityCodeIndex` (`pictureSecurityCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
