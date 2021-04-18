package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.SalesOrder;

/**
 * Created by fish on 2021/4/18.
 */
@Component
public class SalesOrderRepository extends CurdRepository<SalesOrder,Long> {
}
