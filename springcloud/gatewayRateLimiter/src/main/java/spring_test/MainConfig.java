package spring_test;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import reactor.core.publisher.Mono;

@Configuration
public class MainConfig {
    @Bean
    @Primary
    public KeyResolver defaultResolver(){
        return exchange -> {
            return Mono.just(1+"");
        };
    }

    @Bean
    public KeyResolver randomResolver(){
        return exchange -> {
            return Mono.just(Math.ceil(Math.random()*100)+"");
        };
    }

    //空字符串也会加入到RateLimiter测试里面
    @Bean
    public KeyResolver emptyResolver(){
        return exchange -> {
            return Mono.just("");
        };
    }

    @Bean
    public KeyResolver userParameterResolver(){
        return exchange -> {
            return Mono.just(exchange.getRequest().getQueryParams().getFirst("user"));
        };
    }
}
