package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Item;

@Component
public class ItemRepository extends  CurdRepository<Item,Long>{

}
