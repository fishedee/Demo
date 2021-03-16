package spring_test3.inner_package3;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import spring_test3.ServiceG;

/**
 * Created by fish on 2021/3/15.
 */
@Configuration
public class ConfigureTestInner3 {
    @Bean
    @ConditionalOnMissingBean(ServiceG.class)
    public ServiceG getServiceG(){
        return new ServiceGImpl3();
    }
}
