package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by fish on 2021/4/25.
 */
@Component
@Slf4j
public class OrderDOTest {
    @Autowired
    private Validator validator;

    @Autowired
    private ValidatorFactory validatorFactoryBean;

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



    //手动验证2,有更好的错误输出
    public void check2(OrderDO orderDO){
        Set<ConstraintViolation<Object>> validateSet = validatorFactoryBean.getValidator().validate(orderDO);
        if (!CollectionUtils.isEmpty(validateSet)) {
            Iterator<ConstraintViolation<Object>> iterator = validateSet.iterator();
            List<String> msgList = new ArrayList<>();
            while (iterator.hasNext()) {
                ConstraintViolation<?> cvl = iterator.next();
                msgList.add(cvl.getPropertyPath()+":"+cvl.getMessage());
            }
            log.error("fail {}",msgList.toString());
        }
    }

    public void go2(){
        log.info("OrderDOTest go2 ....");
        OrderDO data = new OrderDO();
        data.setId(10001L);
        check2(data);
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
