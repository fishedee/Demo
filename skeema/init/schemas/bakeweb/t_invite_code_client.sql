CREATE TABLE `t_invite_code_client` (
  `inviteCodeClientId` int(11) NOT NULL AUTO_INCREMENT,
  `sendClientId` int(11) NOT NULL,
  `receiveClientId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inviteCodeClientId`),
  UNIQUE KEY `ReceiveClientIdIndex` (`receiveClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
