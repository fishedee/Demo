package spring_test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/24.
 */
@Component
public class ServiceB {
    final Logger logger = LoggerFactory.getLogger(getClass());

    public void go(){
        //info的没有输出,因为不符合输出的级别要求
        logger.info("serviceB info go");

        logger.error("serviceB error go");
    }
}
