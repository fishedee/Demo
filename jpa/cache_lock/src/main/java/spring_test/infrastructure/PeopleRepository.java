package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.People;
import spring_test.business.People2;

/**
 * Created by fish on 2021/4/24.
 */
@Component
public class PeopleRepository extends CurdRepository<People,Long> {
}
