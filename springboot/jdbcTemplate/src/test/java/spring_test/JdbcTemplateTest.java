package spring_test;


import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit test for simple App.
 */
@DataJpaTest(includeFilters = @ComponentScan.Filter(
        type= FilterType.ASSIGNABLE_TYPE,
        classes = {UserRepository.class}
))
public class JdbcTemplateTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Sql("classpath:/init.sql")
    public void testCurd(){
        //插入并获取自增ID
        User user1 = new User("fish");
        User user2 = new User("cat");
        userRepository.add(user1);
        userRepository.add(user2);
        assertEquals(user1.getId(),1);
        assertEquals(user2.getId(),2);

        //findAll
        List<User> users = userRepository.findAll();
        JsonAssertUtil.checkEqualStrict(
                "[{id:1,name:\"fish\"},{id:2,name:\"cat\"}]",
                users
        );

        //findByName
        List<User> users2 = userRepository.findByName("a");
        JsonAssertUtil.checkEqualStrict(
                "[{id:2,name:\"cat\"}]",
                users2
        );

        //findByName2
        List<User> users3 = userRepository.findByName2("s");
        JsonAssertUtil.checkEqualStrict(
                "[{id:1,name:\"fish\"}]",
                users3
        );

        //mod
        user1.setName("dog");
        userRepository.mod(user1);
        List<User> users4 = userRepository.findAll();
        JsonAssertUtil.checkEqualStrict(
                "[{id:1,name:\"dog\"},{id:2,name:\"cat\"}]",
                users4
        );

        //del
        userRepository.del(2);
        List<User> users5 = userRepository.findAll();
        JsonAssertUtil.checkEqualStrict(
                "[{id:1,name:\"dog\"}]",
                users5
        );
    }
}
