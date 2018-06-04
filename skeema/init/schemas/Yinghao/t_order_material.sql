CREATE TABLE `t_order_material` (
  `orderMaterialId` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `materialId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `weight` decimal(19,4) NOT NULL,
  `price` decimal(19,4) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderMaterialId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
