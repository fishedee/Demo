CREATE TABLE `t_content_collection_component` (
  `contentCollectionComponentId` int(11) NOT NULL AUTO_INCREMENT,
  `collectionContentId` int(11) NOT NULL,
  `childContentId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contentCollectionComponentId`),
  KEY `collectionContentIdIndex` (`collectionContentId`),
  KEY `childContentIdIndex` (`childContentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
