package spring_test2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import spring_test.ServiceA;

/**
 * Created by fish on 2021/4/14.
 */
@Configuration
public class MyConfiguration {

    @Bean
    public ServiceA getServiceA(){
        return new ServiceAImpl1();
    }
}
