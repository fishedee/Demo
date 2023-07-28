package spring_test;

import org.springframework.cloud.gateway.filter.ReactiveLoadBalancerClientFilter;
import org.springframework.core.Ordered;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR;

@Component
@Slf4j
public class CustomGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        long startTime = System.currentTimeMillis();
        return chain.filter(exchange).doFinally(signalType -> {
            long executionTime = System.currentTimeMillis() - startTime;
            HttpStatus statusCode = exchange.getResponse().getStatusCode();
            URI url = exchange.getRequest().getURI();
            log.info("Uri: {} | TargetUri:{} | HTTP Status: {} | Execution Time: {} ms ",
                    url,
                    exchange.getRequiredAttribute(GATEWAY_REQUEST_URL_ATTR) ,
                    statusCode,
                    executionTime);

            // Note: It's not possible to log response body without caching it first or reading it twice,
            // which can impact performance. Be sure to consider these trade-offs before deciding to log response bodies.
        });
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}
