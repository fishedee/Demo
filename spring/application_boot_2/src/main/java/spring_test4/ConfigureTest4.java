package spring_test4;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import spring_test3.ServiceG;

/**
 * Created by fish on 2021/3/15.
 */
@Configuration
@ComponentScan
public class ConfigureTest4 {

    @Bean
    @ConditionalOnMissingBean(ServiceG.class)
    public ServiceG getServiceG(){
        return new ServiceGImpl2();
    }
}
