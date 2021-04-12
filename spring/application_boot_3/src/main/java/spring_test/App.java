package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableConfigurationProperties(ServiceC.class)
public class App implements ApplicationRunner
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private ServiceA serviceA;

    @Autowired
    private ServiceB serviceB;

    @Autowired
    private ServiceC serviceC;

    public   void run(ApplicationArguments arguments) throws Exception{
        this.serviceA.go();

        this.serviceB.sendEmail();

        System.out.printf("serviceC name: %s\n",serviceC.getName());
    }
}
