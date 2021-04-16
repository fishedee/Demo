package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Contact;
import spring_test.business.Country;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */
@Component
public class ContactRepository extends CrudRepository<Contact,Long>{
}