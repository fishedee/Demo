package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Country2;

/**
 * Created by fish on 2021/4/22.
 */
@Component
public class Country2Repository extends CurdRepository<Country2,Long> {
}
