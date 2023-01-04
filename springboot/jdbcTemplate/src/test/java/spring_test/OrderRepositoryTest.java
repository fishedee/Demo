package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.context.jdbc.Sql;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest(includeFilters = @ComponentScan.Filter(
        type= FilterType.ASSIGNABLE_TYPE,
        classes = {OrderRepository.class}
))
@Slf4j
public class OrderRepositoryTest {
    @Autowired
    private OrderRepository orderRepository;

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    private SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Test
    @Sql("classpath:/init.sql")
    public void testBasic()throws ParseException {
        //插入并获取自增ID
        Order order1 = new Order(
                dateFormat.parse("2020-01-02"),
                timeFormat.parse("2022-01-02 01:22:23")
        );
        Order order2 = new Order(
                dateFormat.parse("2020-01-04"),
                timeFormat.parse("2022-04-02 03:22:23")
        );
        orderRepository.add(order1);
        orderRepository.add(order2);
        assertEquals(order1.getId(),1);
        assertEquals(order2.getId(),2);

        //findAll
        List<Order> orders = orderRepository.findAll();
        JsonAssertUtil.checkEqualStrict(
                "[{id:1,orderDate:\"2020-01-02\",createTime:\"2022-01-02 01:22:23\"},{id:2,orderDate:\"2020-01-04\",createTime:\"2022-04-02 03:22:23\"}]",
                orders
        );

        //findByDate
        List<Order> orders2 = orderRepository.findByOrderDate(dateFormat.parse("2020-01-04"));
        JsonAssertUtil.checkEqualNotStrict(
                "[{id:2}]",
                orders2
        );

        //findByCreateTime
        List<Order> orders3 = orderRepository.findByCreateTimeRange(
                timeFormat.parse("2021-01-02 01:22:23"),
                timeFormat.parse("2022-01-02 01:22:23")
        );
        JsonAssertUtil.checkEqualNotStrict(
                "[{id:1}]",
                orders3
        );
    }
}
