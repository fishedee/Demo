package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Car;

/**
 * Created by fish on 2021/4/17.
 */
@Component
public class CarRepository extends CurdRepository<Car,Long> {
}
