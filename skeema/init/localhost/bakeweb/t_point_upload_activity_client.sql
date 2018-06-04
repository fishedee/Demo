CREATE TABLE `t_point_upload_activity_client` (
  `pointUploadActivityClientId` int(11) NOT NULL AUTO_INCREMENT,
  `pointClientId` int(11) NOT NULL,
  `pointUploadActivityType` int(11) NOT NULL,
  `pointUploadId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pointUploadActivityClientId`),
  KEY `pointClientIdIndex` (`pointClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
