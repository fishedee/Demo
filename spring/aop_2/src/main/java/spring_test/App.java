package spring_test;

import org.springframework.beans.factory.BeanFactory ;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        ApplicationContext bf = new ClassPathXmlApplicationContext("beanFactory.xml");

        //spring的serviceA
        ServiceA serviceA = (ServiceA) bf.getBean("serviceA");
        System.out.println("serviceA ref: "+System.identityHashCode(serviceA) );
        serviceA.showAnimal();
        serviceA.finalShowAnimal();
        serviceA.finalShowAnimal2();

        //我们模拟serviceA的Cglib实现
        ServiceA serviceAExtends = new ServiceAExtends();
        serviceAExtends.showAnimal();
        serviceAExtends.finalShowAnimal();
        serviceAExtends.finalShowAnimal2();


        //这样会失败,因为ServiceB被aop包绕后,用接口的情况下用Proxy实现,返回的是IServiceB类型,不是ServiceB类型
        //ServiceB serviceB = (ServiceB) bf.getBean("serviceB");

        //成功,返回的是Proxy的aop实现,IServiceB类型
        IServiceB serviceB = (IServiceB) bf.getBean("serviceB");
        System.out.println("serviceB showPlace ref: "+ System.identityHashCode(serviceB));
        serviceB.showPlace();

        //我们模拟serviceB的Interface实现
        IServiceB serviceBInterface = new ServiceBInterface();
        serviceBInterface.showPlace();


        ServiceC serviceC = (ServiceC) bf.getBean("serviceC");
        serviceC.go1();
        serviceC.go2();
    }
}
