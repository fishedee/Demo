CREATE TABLE `t_contact` (
  `contactId` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(32) NOT NULL,
  `phone` char(32) NOT NULL,
  `phone2` char(32) NOT NULL,
  `phone3` char(32) NOT NULL,
  `groupId` int(11) NOT NULL,
  `remark` varchar(128) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contactId`),
  KEY `phoneIndex` (`phone`),
  KEY `phone2Index` (`phone2`),
  KEY `phone3Index` (`phone3`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
