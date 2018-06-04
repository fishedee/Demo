CREATE TABLE `t_invite_code_device` (
  `inviteCodeDeviceId` int(11) NOT NULL AUTO_INCREMENT,
  `inviteCodeId` int(11) NOT NULL,
  `deviceUniqueId` varchar(256) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inviteCodeDeviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
