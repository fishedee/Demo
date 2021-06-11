package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Category;

@Component
public class CategoryRepository extends  CurdRepository<Category,Long>{
}
