package spring_test3;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import spring_test4.ConfigureTest4;

/**
 * Created by fish on 2021/3/15.
 */
@Configuration
@Import(ConfigureTest4.class)
@ComponentScan
public class ConfigureTest3 {
    @Bean
    public ServiceF getServiceF(){
        return new ServiceF("[I am tip]");
    }

    @Bean
    @ConditionalOnMissingBean(ServiceG.class)
    public ServiceG getServiceG(){
        return new ServiceGImpl1();
    }
}
