package spring_test;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import com.github.springtestdbunit.assertion.DatabaseAssertionMode;
import lombok.Data;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        MockitoTestExecutionListener.class,
        DbUnitTestExecutionListener.class
})
public class Test2 {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Service service;

    /*
    NONE：不执行任何操作，是getTearDownOperation的默认返回值。
    UPDATE：将数据集中的内容更新到数据库中。它假设数据库中已经有对应的记录，否则将失败。
    INSERT：将数据集中的内容插入到数据库中。它假设数据库中没有对应的记录，否则将失败。
    REFRESH：将数据集中的内容刷新到数据库中。如果数据库有对应的记录，则更新，没有则插入。
    DELETE：删除数据库中与数据集对应的记录。
    DELETE_ALL：删除表中所有的记录，如果没有对应的表，则不受影响。
    TRUNCATE_TABLE：与DELETE_ALL类似，更轻量级，不能rollback。
    CLEAN_INSERT：是一个组合操作，是DELETE_ALL和INSERT的组合。是getSetUpOeration的默认返回值。
     */
    @DatabaseSetup( value = {"classpath:/test2.xml"},type = DatabaseOperation.CLEAN_INSERT)
    @Test
    public void go() {
        List<User> users = userRepository.getAll();
        assertEquals(users.size(), 2);

        service.add(new User("kk"));
        users = userRepository.getAll();
        assertEquals(users.size(), 3);
    }

    //使用CLEAN_INSERT能保证每次数据库都是在干净的情况下再运行的
    @DatabaseSetup( value = {"classpath:/test3.xml"},type = DatabaseOperation.CLEAN_INSERT)
    @Test
    public void go2() {
        List<User> users = userRepository.getAll();
        assertEquals(users.size(), 1);
    }

    @DatabaseSetup( value = {"classpath:/test4.xml"},type = DatabaseOperation.CLEAN_INSERT)
    @ExpectedDatabase(value="classpath:/test4_validate.xml",assertionMode= DatabaseAssertionMode.DEFAULT)
    @Test
    public void go3(){
        this.service.mod(1L,"KK");
    }
}
