CREATE TABLE `t_app_idfa` (
  `appIdfaId` int(11) NOT NULL AUTO_INCREMENT,
  `idfa` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`appIdfaId`),
  UNIQUE KEY `idfaIndex` (`idfa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
