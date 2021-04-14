package spring_test2;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spring_test.ServiceA;

/**
 * Created by fish on 2021/4/14.
 */
public class ServiceAImpl1 implements ServiceA {

    private Logger logger = LoggerFactory.getLogger(getClass());

    public void showMsg(){
        logger.info("spring_test2.ServiceAImpl1 showMsg");
    }
}
