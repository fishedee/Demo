CREATE TABLE `t_point_sign_activity_client` (
  `pointSignActivityClientId` int(11) NOT NULL AUTO_INCREMENT,
  `pointClientId` int(11) NOT NULL,
  `continueNum` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pointSignActivityClientId`),
  KEY `pointClientIdIndex` (`pointClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
