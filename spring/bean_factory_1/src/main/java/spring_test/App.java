package spring_test;

import org.springframework.beans.factory.BeanFactory ;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        BeanFactory beanFactory = new XmlBeanFactory(new ClassPathResource("beanFactory.xml"));

        //通过id来获取bean
        ServiceA service1 = (ServiceA)beanFactory.getBean("service1");
        service1.showMessage();

        ServiceA service2 = (ServiceA)beanFactory.getBean("service2");
        service2.showMessage();

        //<!--不能直接通过私有变量来注入-->
        //ServiceA service3 = (ServiceA)beanFactory.getBean("service3");
        //service3.showMessage();

        //通过类型来获取bean
        ServiceB service4 = (ServiceB)beanFactory.getBean(ServiceB.class);
        service4.showAnimal();

        //获取factory的bean
        //IServiceC service5 = (IServiceC) beanFactory.getBean(IServiceC.class);
        IServiceC service5 = (IServiceC) beanFactory.getBean("service5");
        service5.swim();
    }
}
