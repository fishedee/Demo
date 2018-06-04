CREATE TABLE `t_company` (
  `companyId` int(11) NOT NULL AUTO_INCREMENT,
  `productDesc` varchar(32) NOT NULL,
  `address` varchar(32) NOT NULL,
  `remark` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
