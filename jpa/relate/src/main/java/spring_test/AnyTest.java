package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Employee;
import spring_test.business.Human;
import spring_test.business.Student;
import spring_test.infrastructure.EmployeeRepository;
import spring_test.infrastructure.HumanRepository;
import spring_test.infrastructure.StudentRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Component
@Slf4j
public class AnyTest {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private HumanRepository humanRepository;

    @Transactional
    public void add(){
        Student student1 = new Student("学生1");
        Student student2 = new Student("学生2");
        Employee employee1 = new Employee("雇员1");
        Employee employee2 = new Employee("雇员2");

        studentRepository.add(student1);
        studentRepository.add(student2);
        employeeRepository.add(employee1);
        employeeRepository.add(employee2);

        Human[] humans = new Human[]{
                new Human(student1),
                new Human(student2),
                new Human(employee1),
                new Human(employee2),
        };
        for( Human human :humans ){
            humanRepository.add(human);
        }
    }

    public void showAll(){
        List<Human> humanList = humanRepository.getAll();
        log.info("humanList {}",humanList);
    }

    public void go(){
        AnyTest app = (AnyTest) AopContext.currentProxy();
        //app.add();

        app.showAll();
    }
}
