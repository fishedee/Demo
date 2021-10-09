package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Good;
import spring_test.business.PurchaseOrder;

@Component
public class GoodRepository extends CurdRepository<Good,Long>{
}
