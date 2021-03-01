package spring_test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        ApplicationContext bf = new ClassPathXmlApplicationContext("beanFactory.xml");

        ServiceB serviceB = (ServiceB) bf.getBean("serviceB");

        //这个消息,MyListener是接收的
        serviceB.sendMsg();

        //这个消息,MyListener是不接收的,因为类型不匹配
        serviceB.sendMsg2();
    }
}
