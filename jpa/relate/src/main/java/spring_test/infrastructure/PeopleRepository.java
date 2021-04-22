package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Country;
import spring_test.business.People;

/**
 * Created by fish on 2021/4/22.
 */
@Component
public class PeopleRepository extends CurdRepository<People,Long> {
}
