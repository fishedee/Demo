package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Country;

/**
 * Created by fish on 2021/4/17.
 */
@Component
public class CountryRepository extends CurdRepository<Country,Long> {
}
