CREATE TABLE `BookInfo` (
  `TableID` int(11) NOT NULL AUTO_INCREMENT,
  `BookCode` varchar(32) NOT NULL,
  `BookName` varchar(32) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`TableID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
