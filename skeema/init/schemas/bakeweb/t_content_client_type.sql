CREATE TABLE `t_content_client_type` (
  `contentClientTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `visitNum` int(11) NOT NULL,
  `likeNum` int(11) NOT NULL,
  `hateNum` int(11) NOT NULL,
  `shareNum` int(11) NOT NULL,
  `collectNum` int(11) NOT NULL,
  `likeSelfNum` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentClientTypeId`),
  UNIQUE KEY `clientIdAndTypeIndex` (`clientId`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
