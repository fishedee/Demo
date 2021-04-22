package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Student;

/**
 * Created by fish on 2021/4/22.
 */
@Component
public class StudentRepository extends CurdRepository<Student,Long>{
}
