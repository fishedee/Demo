package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Country;

@Component
public class CountryRepository extends CurdRepository<Country,Long>{
}
