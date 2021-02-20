package spring_test;

import org.springframework.beans.factory.BeanFactory ;
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

        BeanFactory beanFactory = new XmlBeanFactory(new ClassPathResource("beanFactory.xml"));

        //获取bean
        ServiceA serviceA = (ServiceA)beanFactory.getBean(ServiceA.class);
        ServiceB serviceB = (ServiceB)beanFactory.getBean(ServiceB.class);
        ServiceC serviceC = (ServiceC)beanFactory.getBean(ServiceC.class);

        //检查对应的ref
        System.out.println(serviceA.getServiceB()==serviceB);
        System.out.println(serviceB.getServiceC()==serviceC);
        System.out.println(serviceC.getServiceA()==serviceA);
    }
}
