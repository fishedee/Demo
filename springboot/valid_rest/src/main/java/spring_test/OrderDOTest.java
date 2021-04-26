package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by fish on 2021/4/25.
 */
@Component
@Slf4j
public class OrderDOTest {
    @Autowired
    private Validator validator;

    //手动验证
    public void check(OrderDO orderDO){
        Set<ConstraintViolation<OrderDO>> sets =  validator.validate(orderDO);
        for( ConstraintViolation<OrderDO> t :sets){
            log.error("fail [{} {}]",t.getPropertyPath(),t.getMessage());
        }
    }

    public void go1(){
        log.info("OrderDOTest go1 ....");
        OrderDO data = new OrderDO();
        check(data);
    }

    public void go2(){
        log.info("OrderDOTest go2 ....");
        OrderDO data = new OrderDO();
        data.setId(10001L);
        check(data);
    }

    public void go3(){
        log.info("OrderDOTest go3 ....");
        OrderDO data = new OrderDO();
        data.setId(10001L);
        data.setName("aa");
        data.setEmail("123@qq.com");
        check(data);
    }

    public void go4(){
        log.info("OrderDOTest go4 ....");
        OrderDO data = new OrderDO();
        data.setId(10001L);
        data.setName("aa");
        data.setEmail("123@qq.com");
        data.setSize(0);
        check(data);
    }

    public void go5(){
        log.info("OrderDOTest go5 ....");
        OrderDO data = new OrderDO();
        data.setId(10001L);
        data.setName("aa");
        data.setEmail("123@qq.com");
        data.setSize(100);
        data.setTotal(new BigDecimal("0.001"));
        check(data);
    }

    public void go(){
        go1();
        go2();
        go3();
        go4();
        go5();
    }
}
