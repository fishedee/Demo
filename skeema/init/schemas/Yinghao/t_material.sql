CREATE TABLE `t_material` (
  `materialId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `materialTypeId` int(11) NOT NULL,
  `remark` varchar(32) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`materialId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
