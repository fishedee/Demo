package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.PurchaseOrder;

/**
 * Created by fish on 2021/4/19.
 */
@Component
public class PurchaseOrderRepositoy extends CurdRepository<PurchaseOrder,Long>{
}
