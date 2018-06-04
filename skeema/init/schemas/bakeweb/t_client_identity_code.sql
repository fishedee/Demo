CREATE TABLE `t_client_identity_code` (
  `clientIdentityCodeId` int(11) NOT NULL AUTO_INCREMENT,
  `phone` char(11) NOT NULL,
  `pictureSecurityCode` varchar(128) NOT NULL,
  `identityCode` char(6) NOT NULL,
  `identityErrorTry` int(11) NOT NULL,
  `isValid` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientIdentityCodeId`),
  KEY `phoneIndex` (`phone`),
  KEY `phonePictureSecurityCodeIndex` (`pictureSecurityCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
