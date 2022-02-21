update item_order 
inner join item on item_order.item_id = item.id
set item_order.item_name = item.name;