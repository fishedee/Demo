package spring_test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;
import static io.github.jsonSnapshot.SnapshotMatcher.*;
import static io.github.jsonSnapshot.SnapshotUtils.*;
import io.github.jsonSnapshot.SnapshotCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

/**
 * Created by fish on 2021/5/30.
 */
@SpringBootTest
@Import({JacksonAutoConfiguration.class})
public class Test1 {
    @BeforeAll
    public static void beforeAll() {
        start();
    }

    @AfterAll
    public static void afterAll() {
        validateSnapshots();
    }

    @Autowired
    private ObjectMapper objectMapper;

    public String toString(Object data)throws Exception{
        return objectMapper.writeValueAsString(data);
    }

    @Test
    public void test1() throws Exception{

        OrderDO orderDO = new OrderDO();

        orderDO.setSize(1);
        orderDO.setName("fish");
        expect(toString(orderDO)).toMatchSnapshot();


        OrderDO orderDO2 = new OrderDO();

        orderDO2.setSize(2);
        orderDO2.setName("cat");

        expect(toString(orderDO2)).toMatchSnapshot();

    }

}
