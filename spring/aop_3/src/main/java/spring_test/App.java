package spring_test;

import org.springframework.beans.factory.BeanFactory ;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAttributeSourceAdvisor;
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
        serviceA.go1();
        serviceA.go2();

    }
}
