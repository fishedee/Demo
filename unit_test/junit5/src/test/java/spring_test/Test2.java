package spring_test;

import org.junit.jupiter.api.Test;

/**
 * Created by fish on 2021/5/30.
 */
public class Test2 {

    @Test
    public void test1(){
        OrderDO orderDO = new OrderDO();

        orderDO.setSize(1);
        orderDO.setName("fish");

        JsonAssertUtil.checkEqualNotStrict(
                "{size:1}",
                orderDO
        );

        JsonAssertUtil.checkEqualNotStrict(
                "{name:\"fish\"}",
                orderDO
        );
    }
}
