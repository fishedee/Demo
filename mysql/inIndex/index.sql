use MySqlTest;

alter table t_remind_1 add index idIndex(id);
alter table t_remind_1 add index IDX_CONTENTID(contentId);
alter table t_remind_1 add index idx_receiveClientId_remindId_remindType_contentType(receiveClientId,remindId,remindType,contentType);
alter table t_remind_1 add index recvAndIsRAndReTypeIndex(receiveClientId,isRead,remindType);
alter table t_remind_1 add index recvAndReTypeAndConTypeIndex(receiveClientId,remindType,contentType,remindId);
alter table t_remind_1 add index remindId_receiveClientId_remindType_createTime_index(remindId,receiveClientId,remindType,createTime);
alter table t_remind_1 add index remindTypeIndex(receiveClientId,remindType,sendClientId,id);

alter table t_remind_2 add index idIndex(id);
alter table t_remind_2 add index IDX_CONTENTID(contentId);
alter table t_remind_2 add index idx_receiveClientId_remindId_remindType_contentType(receiveClientId,remindId,remindType,contentType);
alter table t_remind_2 add index recvAndIsRAndReTypeIndex(receiveClientId,isRead,remindType);
alter table t_remind_2 add index recvAndReTypeAndConTypeIndex(receiveClientId,remindType,contentType,remindId);
alter table t_remind_2 add index remindId_receiveClientId_remindType_createTime_index(remindId,receiveClientId,remindType,createTime);
alter table t_remind_2 add index remindTypeIndex(receiveClientId,remindType,sendClientId,id);