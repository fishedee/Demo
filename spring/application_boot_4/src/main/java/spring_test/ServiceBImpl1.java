package spring_test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by fish on 2021/4/14.
 */
public class ServiceBImpl1 implements ServiceB {

    private Logger logger = LoggerFactory.getLogger(getClass());

    public void showHello(){
        logger.info("spring_test.serviceBImpl1 showHello");
    }
}
