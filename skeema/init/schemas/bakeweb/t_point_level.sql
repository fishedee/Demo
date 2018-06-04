CREATE TABLE `t_point_level` (
  `pointLevelId` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `point` int(11) NOT NULL,
  `image` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pointLevelId`),
  KEY `levelIndex` (`level`),
  KEY `pointIndex` (`point`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
