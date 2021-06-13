package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.*;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by fish on 2021/5/30.
 */
//
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
//每个方法之后都会重置ApplicationContext，速度会变慢，但是环境每次都是全新的
@DirtiesContext(classMode= DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class Test1 {
    @Autowired
    private UserRepository userRepository;

    private Test1 current;

    @Autowired
    private Service service;

    @BeforeEach
    public void init(){
        //Test1不纳入Spring的bean，所以不能使用AopContext.currentProxy();
        //current = (Test1) AopContext.currentProxy();
    }

    @Transactional
    public void add(User user){
        this.userRepository.add(user);
    }

    @Test
    public void go(){
        List<User> users = userRepository.getAll();
        assertEquals(users.size(),0);

        service.add(new User("fish"));
        assertEquals(userRepository.getAll().size(),1);
    }

    @Test
    public void go2(){
        List<User> users = userRepository.getAll();
        assertEquals(users.size(),0);

        service.add(new User("cat"));
        service.add(new User("dog"));
        assertEquals(userRepository.getAll().size(),2);
    }
}
