package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.dialect.PostgreSQL95Dialect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Slf4j
public class App
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }
}
