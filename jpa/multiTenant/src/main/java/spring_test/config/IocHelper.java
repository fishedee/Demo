package spring_test.config;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class IocHelper implements BeanFactoryAware {
    private static BeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory var1) throws BeansException{
        beanFactory = var1;
    }

    public static <T> T getBean(Class<T> clazz){
        return beanFactory.getBean(clazz);
    }
}
