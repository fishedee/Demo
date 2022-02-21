update item_order 
left join item on item_order.item_id = item.id
set item_order.item_name = 'unknown_item'
where item.id is null;