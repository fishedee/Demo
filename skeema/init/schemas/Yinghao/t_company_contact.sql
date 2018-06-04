CREATE TABLE `t_company_contact` (
  `companyContactId` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `contactId` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`companyContactId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
