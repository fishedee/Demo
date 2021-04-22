package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Employee;

/**
 * Created by fish on 2021/4/22.
 */
@Component
public class EmployeeRepository extends CurdRepository<Employee,Long>{
}
