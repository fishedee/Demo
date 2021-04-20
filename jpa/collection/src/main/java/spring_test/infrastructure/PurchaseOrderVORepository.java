package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.PurchaseOrder;
import spring_test.business.PurchaseOrderVO;

/**
 * Created by fish on 2021/4/20.
 */
@Component
public class PurchaseOrderVORepository extends CurdRepository<PurchaseOrderVO,Long>{
}
