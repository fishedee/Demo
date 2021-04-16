package spring_test.infrastructure;


import org.springframework.stereotype.Component;
import spring_test.business.People;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/12.
 */
@Component
public class PeopleRepository extends CrudRepository<People,Long>{
}
