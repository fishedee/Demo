CREATE TABLE `t_client_security_code` (
  `clientSecurityCodeId` int(11) NOT NULL AUTO_INCREMENT,
  `phone` char(11) NOT NULL,
  `securityCode` varchar(128) NOT NULL,
  `isValid` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientSecurityCodeId`),
  KEY `securityCodeIndex` (`securityCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
