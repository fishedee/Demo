CREATE TABLE `t_client_password` (
  `clientId` int(11) NOT NULL,
  `password` char(60) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
