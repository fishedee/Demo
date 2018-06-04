CREATE TABLE `t_wx_spilder_task` (
  `wxSpilderTaskId` int(11) NOT NULL AUTO_INCREMENT,
  `publicId` varchar(32) NOT NULL,
  `beginTime` date NOT NULL,
  `count` int(11) NOT NULL,
  `result` varchar(255) NOT NULL,
  `state` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`wxSpilderTaskId`),
  KEY `stateIndex` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
