package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.ItemStockOrder;

/**
 * Created by fish on 2021/4/20.
 */
@Component
public class ItemStockOrderRepository extends CurdRepository<ItemStockOrder,Long> {
}
