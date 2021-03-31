package mybatis_test;

import mybatis_test.model.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by fish on 2021/3/28.
 */
public class StringUtil {
    final static Logger logger= LoggerFactory.getLogger(StringUtil.class);
    public static void print(Object parameter){
        logger.info("MyBatis print {}",parameter);
    }
}
