CREATE TABLE `t_export_excel` (
  `exportExcelId` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(2048) NOT NULL,
  `title` varchar(256) NOT NULL,
  `state` int(11) NOT NULL,
  `stateMessage` varchar(2048) NOT NULL,
  `toEmail` varchar(256) NOT NULL,
  `cookies` varchar(2048) NOT NULL,
  `fileUrl` varchar(256) NOT NULL,
  `data` mediumblob NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`exportExcelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
