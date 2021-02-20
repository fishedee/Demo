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
        //对于符合条件的bean,我们可以返回新的bean给他
        //注意,原始的bean,只能以参数的方式传入
        if( beanName.equals("serviceD")){
            return new ServiceCMock((ServiceC)bean);
        }
        return bean;
    }
}
