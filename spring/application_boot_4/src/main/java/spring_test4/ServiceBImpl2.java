package spring_test4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spring_test.ServiceB;

/**
 * Created by fish on 2021/4/14.
 */
public class ServiceBImpl2 implements ServiceB {
    private Logger logger = LoggerFactory.getLogger(getClass());

    public void showHello(){
        logger.info("spring_test4.serviceBImpl2 showHello");
    }
}
