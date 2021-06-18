package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Car;

@Component
public class CarRepository extends CurdRepository<Car,Long>{
}
