package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Address;
import spring_test.business.Student;
import spring_test.business.User;
import spring_test.infrastructure.StudentRepository;
import spring_test.infrastructure.UserRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class StudentTest {
    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public Long add(Student student){
        this.studentRepository.add(student);
        return student.getId();
    }

    @Transactional
    public void mod(Long id,String school,String name,Address address){
        Student student = this.studentRepository.find(id);
        if(student == null){
            throw new RuntimeException("找不到"+id+"的学生");
        }
        student.mod(school,name,address);
    }

    public void showAll(){
        List<Student> all = this.studentRepository.getAll();
        log.info("all Student {}",all);
    }

    public void go(){
        StudentTest app = (StudentTest) AopContext.currentProxy();

        Long id = app.add(new Student("第一中学","李雷",new Address("中国2","杭州2","北京路2","A1231")));
        app.showAll();

        app.mod(id,"师范小学","韩雪",new Address("美国2","德克萨斯洲2","建国路2","B1231"));
        app.showAll();
    }
}
