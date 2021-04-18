package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAspectJAutoProxy(exposeProxy = true)
@Slf4j
public class App implements ApplicationRunner
{

    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @PostConstruct
    void started()
    {
        //设置时区
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Shanghai"));
    }


    @Autowired
    public CountryTest countryTest;

    @Autowired
    private PeopleTest peopleTest;

    @Autowired
    private CarTest carTest;

    public   void run(ApplicationArguments arguments) throws Exception {
        carTest.go();
    }
}
