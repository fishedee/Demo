package spring_test;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Metrics;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import javax.annotation.PostConstruct;

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

    @Autowired
    private MeterRegistry meterRegistry;

    @PostConstruct
    public void init(){
        //全局的默认tag
        meterRegistry.config().commonTags("Machine","fish");
    }
}
