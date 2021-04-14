package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import spring_test5.EnableMyComponent;
import spring_test6.EnableMyRepository;

/**
 * Hello world!
 *
 */
@SpringBootApplication
//尝试将ShowMsg的value从spring_test2改为spring_test3
@ShowMsg("spring_test2")
@ShowHello
@EnableMyComponent
@EnableMyRepository
public class App implements ApplicationRunner
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }
    @Bean
    public ServiceB getServiceB(){
        return new ServiceBImpl1();
    }

    @Autowired
    private ServiceA serviceA;

    @Autowired
    private ServiceB serviceB;

    @Autowired
    private ServiceC serviceC;

    @Autowired
    private RepositoryA repositoryA;

    @Autowired
    private RepositoryB repositoryB;

    public   void run(ApplicationArguments arguments) throws Exception{
        System.out.println("run ... ");
        serviceA.showMsg();

        serviceB.showHello();

        serviceC.go();

        repositoryA.findById(1);

        repositoryB.del(1);
    }
}
