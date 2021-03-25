package spring_test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/24.
 */
@Component
public class ServiceA {
    final Logger logger = LoggerFactory.getLogger(getClass());

    public void go(){
        logger.info("hello {},I am {}","fish","123");

        logger.error("I am {}","error!");
    }
}
