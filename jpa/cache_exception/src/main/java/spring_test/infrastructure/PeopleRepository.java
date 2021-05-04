package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Car;
import spring_test.business.People;

/**
 * Created by fish on 2021/5/4.
 */
@Component
public class PeopleRepository extends CurdRepository<People,Long>{
}
