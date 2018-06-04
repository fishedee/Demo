CREATE TABLE `t_order` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `totalPrice` decimal(19,4) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
