package spring_test;

import au.com.origin.snapshots.junit5.SnapshotExtension;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import au.com.origin.snapshots.Expect;

/**
 * Created by fish on 2021/5/30.
 */
@SpringBootTest
@Import({JacksonAutoConfiguration.class})
@ExtendWith({SnapshotExtension.class})
public class Test1 {
    private Expect expect;


    @Autowired
    private ObjectMapper objectMapper;

    public String toString(Object data)throws Exception{
        return objectMapper.writeValueAsString(data);
    }

    //字符串测试，单用例下的多测试
    @Test
    public void test1() throws Exception{

        OrderDO orderDO = new OrderDO();

        orderDO.setSize(1);
        orderDO.setName("fish");
        expect.scenario("1").toMatchSnapshot(toString(orderDO));


        OrderDO orderDO2 = new OrderDO();

        orderDO2.setSize(2);
        orderDO2.setName("dog");

        expect.scenario("2").toMatchSnapshot(toString(orderDO2));

    }

    @Test
    public void test2() throws Exception{

        OrderDO orderDO = new OrderDO();

        orderDO.setSize(1);
        orderDO.setName("fish");
        expect.scenario("1").serializer("json").toMatchSnapshot(toString(orderDO));


        OrderDO orderDO2 = new OrderDO();

        orderDO2.setSize(2);
        orderDO2.setName("dog");

        expect.scenario("2").serializer("json").toMatchSnapshot(toString(orderDO2));

    }

}
