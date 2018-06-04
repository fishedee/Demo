CREATE TABLE `BookInfo` (
  `TableID` int(11) NOT NULL AUTO_INCREMENT,
  `BookCode` varchar(32) NOT NULL,
  `BookName` varchar(32) NOT NULL,
  `BookPlace` varchar(128) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`TableID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
