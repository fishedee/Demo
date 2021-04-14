package spring_test4;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import spring_test.ServiceB;

/**
 * Created by fish on 2021/4/14.
 */
@Configuration
public class MyConfiguration {

    @Bean
    public ServiceB getServiceB(){
        return new ServiceBImpl2();
    }
}
