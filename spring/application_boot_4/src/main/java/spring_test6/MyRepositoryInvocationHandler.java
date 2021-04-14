package spring_test6;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * Created by fish on 2021/4/14.
 */
public class MyRepositoryInvocationHandler implements InvocationHandler {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable{
        logger.info("handler invoke!: method:{},args:{}",method,args);
        return null;
    }
}
