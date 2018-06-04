CREATE TABLE `GroupInfo` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserAccount` varchar(16) NOT NULL,
  `UserPwd` varchar(16) NOT NULL,
  `UseName` varchar(256) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
