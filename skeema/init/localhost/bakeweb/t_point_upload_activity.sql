CREATE TABLE `t_point_upload_activity` (
  `pointUploadActivityId` int(11) NOT NULL AUTO_INCREMENT,
  `medalId` int(11) NOT NULL,
  `pointUploadActivityType` int(11) NOT NULL,
  `dayLimit` int(11) NOT NULL,
  `firstPoint` int(11) NOT NULL,
  `otherPoint` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pointUploadActivityId`),
  KEY `pointUploadActivityTypeIndex` (`pointUploadActivityType`),
  KEY `medalIdIndex` (`medalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
