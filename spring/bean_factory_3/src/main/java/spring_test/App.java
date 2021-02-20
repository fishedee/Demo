package spring_test;

import org.springframework.beans.factory.BeanFactory ;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.Assert;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        DefaultListableBeanFactory beanFactory = new XmlBeanFactory(new ClassPathResource("beanFactory.xml"));

        //ServiceA使用各种aware接口
        ServiceA serviceA = (ServiceA)beanFactory.getBean("serviceA");
        serviceA.showAnimal();

        //serviceB,注意生命周期的回调
        ServiceB serviceB = (ServiceB)beanFactory.getBean("serviceB");
        serviceB.showMessage();

        //手动添加BeanPostProcessor扩展
        MyBeanPostProcessor myBeanPostProcessor = beanFactory.getBean(MyBeanPostProcessor.class);
        beanFactory.addBeanPostProcessor(myBeanPostProcessor);

        //serviceC没有被mock掉
        ServiceC serviceC = (ServiceC)beanFactory.getBean("serviceC");
        serviceC.work();

        //serviceD被mock掉了,mock的逻辑在MyBeanPostProcessor里面
        ServiceC serviceD = (ServiceC)beanFactory.getBean("serviceD");
        serviceD.work();
    }
}
