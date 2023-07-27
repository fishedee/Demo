package spring_test;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MainConfig {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        //curl http://localhost:8111/get，正常的拉取数据的方式
        //curl --dump-header - --header 'Host: www.circuitbreaker.com' http://localhost:8111/delay/3, 模拟断线的方式
        return builder.routes()
                .route(p -> p
                        .path("/get")
                        .filters(f -> f.addRequestHeader("Hello", "World"))
                        .uri("http://httpbin.org:80"))
                .route(p -> p
                        .host("*.circuitbreaker.com")
                        .filters(f -> f.circuitBreaker(config -> config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://httpbin.org:80"))
                .build();
    }
}
