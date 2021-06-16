package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.*;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import spring_test.infrastructure.SalesOrderRepository;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


//flyway 在测试里面都会自动启动，这个时候会默认使用远程数据库
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
//不需要DirtyContext，每次用例都全部清除数据库，这样在每次运行都是干净的数据库，但是性能比较差，因为每次都要migrate
public class MyTest {

    @Autowired
    private SalesOrderTest salesOrderTest;

    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Autowired
    private Flyway flyway;

    @BeforeEach
    public void setUp(){
        //清除数据
        flyway.clean();
        flyway.migrate();
    }

    @Test
    public void test1(){
        salesOrderTest.add();

        salesOrderTest.add();

        assertEquals(salesOrderRepository.getAll().size(),2);
    }

    @Test
    public void test2(){
        salesOrderTest.add();

        assertEquals(salesOrderRepository.getAll().size(),1);
    }
}
