package spring_test;

import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.jdbc.Sql;

import java.util.Arrays;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

//可以打开H2数据库进行测试
@DataJpaTest
@Slf4j
public class Test1 {

    @Autowired
    private UserRepository userRepository;

    private List<User> getAll(){
        Iterable<User> users = userRepository.findAll();
        List result = new ArrayList();
        for( User user:users){
            result.add(user);
        }
        return result;
    }

    //可以用@Sql来指定加载哪个数据库脚本
    @Test
    @Sql("classpath:/init.sql")
    public void go(){
        //直接读取，数据量为2个
        List<User> users = this.getAll();
        assertEquals(users.size(),2);
    }

    //每个测试都是一个事务中进行，测试完毕后会自动回滚数据。
    @Test
    @Sql("classpath:/init.sql")
    public void go2(){
        //删除了其中一条数据，数据量为1条
        List<User> users = this.getAll();

        userRepository.delete(users.get(0));

        List<User> users2 = this.getAll();
        assertEquals(users2.size(),1);
    }

    @Test
    @Sql("classpath:/init.sql")
    public void go3(){
        //重新读取后，数据量为2条。
        List<User> users = this.getAll();
        assertEquals(users.size(),2);

        List<String> names = users.stream().map((user)->{
            return user.getName();
        }).sorted().collect(Collectors.toList());
        assertIterableEquals(names, Arrays.asList("cat","fish"));
    }
}
