CREATE TABLE `t_invite_code` (
  `inviteCodeId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `code` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inviteCodeId`),
  UNIQUE KEY `clientIdIndex` (`clientId`),
  UNIQUE KEY `codeIndex` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
