package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.People;

@Component
public class PeopleRepository extends CurdRepository<People,Long>{
}
