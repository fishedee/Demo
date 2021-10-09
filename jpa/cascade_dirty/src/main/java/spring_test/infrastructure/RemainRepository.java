package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Good;
import spring_test.business.PurchaseOrder;

@Component
public class RemainRepository extends CurdRepository<Good.Remain,Long> implements Good.RemainService{
}
