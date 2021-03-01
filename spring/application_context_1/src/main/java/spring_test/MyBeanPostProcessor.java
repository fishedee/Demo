package spring_test;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.lang.Nullable;

/**
 * Created by fish on 2021/2/20.
 */
public class MyBeanPostProcessor implements BeanPostProcessor {
    @Nullable
    public  Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("before init:"+beanName);
        return bean;
    }

    @Nullable
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("after init:"+beanName);
        return bean;
    }
}
