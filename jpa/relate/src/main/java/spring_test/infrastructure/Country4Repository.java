package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Country;
import spring_test.business.Country4;

/**
 * Created by fish on 2021/4/22.
 */
@Component
public class Country4Repository extends CurdRepository<Country4,Long> {
}
