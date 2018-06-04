CREATE TABLE `t_golden_statue_task` (
  `goldenStatueTaskId` int(11) NOT NULL AUTO_INCREMENT,
  `targetPhone` varchar(11) NOT NULL,
  `targetClassify` int(11) NOT NULL,
  `targetName` varchar(256) NOT NULL,
  `sourceRecipeId` int(11) NOT NULL,
  `result` varchar(256) NOT NULL,
  `state` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`goldenStatueTaskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
