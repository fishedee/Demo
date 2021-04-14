package spring_test3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spring_test.ServiceA;

/**
 * Created by fish on 2021/4/14.
 */
public class ServiceAImpl2 implements ServiceA {

    private Logger logger = LoggerFactory.getLogger(getClass());

    public void showMsg(){
        logger.info("spring_test3.ServiceAImpl2 showMsg");
    }
}
