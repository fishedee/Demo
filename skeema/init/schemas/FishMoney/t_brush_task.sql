CREATE TABLE `t_brush_task` (
  `brushTaskId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `url` varchar(128) NOT NULL,
  `type` int(11) NOT NULL,
  `retryNum` int(11) NOT NULL,
  `totalNum` int(11) NOT NULL,
  `successNum` int(11) NOT NULL,
  `failNum` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `stateMessage` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`brushTaskId`),
  KEY `typeIndex` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
