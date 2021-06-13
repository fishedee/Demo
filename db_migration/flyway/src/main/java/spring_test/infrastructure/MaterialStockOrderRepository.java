package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.MaterialStockOrder;

/**
 * Created by fish on 2021/4/19.
 */
@Component
public class MaterialStockOrderRepository extends CurdRepository<MaterialStockOrder,Long> {
}
