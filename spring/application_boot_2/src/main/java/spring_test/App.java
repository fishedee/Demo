package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import spring_test.package1.ServiceB;
import spring_test.package1.inner_package1.ServiceC;
import spring_test2.ServiceD;
import spring_test3.ConfigureTest3;
import spring_test3.ServiceE;
import spring_test3.ServiceF;
import spring_test3.ServiceG;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@ComponentScan({"spring_test2","spring_test"})
@Import(ConfigureTest3.class)
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

    @Autowired
    private ServiceD serviceD;

    @Autowired
    private ServiceE serviceE;

    @Autowired
    private ServiceF serviceF;

    @Autowired
    private ServiceG serviceG;

    public void run(ApplicationArguments arguments) throws Exception{
        serviceA.go();
        serviceB.go();
        serviceC.go();
        serviceD.go();
        serviceE.go();
        serviceF.go();
        serviceG.go();
    }
}
