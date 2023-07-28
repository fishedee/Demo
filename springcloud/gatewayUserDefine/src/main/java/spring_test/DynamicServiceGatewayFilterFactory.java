package spring_test;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//全局Filter是不能设置Order的，看这里，https://github.com/spring-cloud/spring-cloud-gateway/issues/1122
@Component
@Slf4j
public class DynamicServiceGatewayFilterFactory extends AbstractGatewayFilterFactory<DynamicServiceGatewayFilterFactory.Config>{
    public DynamicServiceGatewayFilterFactory() {
        super(DynamicServiceGatewayFilterFactory.Config.class);
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("routes");
    }

    private Optional<String> findPath(ServerHttpRequest request,Config config){
        String tenantId = request.getQueryParams().getFirst("tenantId");
        List<TenantAndPathRoute> targetRoute = config.getRoutes().stream().filter(single->{
            return single.getTenantId().equals(tenantId);
        }).collect(Collectors.toList());
        if( targetRoute.size() == 0 ){
            return Optional.empty();
        }
        return Optional.of(targetRoute.get(0).path);
    }

    @Override
    public GatewayFilter apply(Config config){
        return (exchange,chain)->{
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            Optional<String> path = this.findPath(request,config);
            if( path.isPresent() == false ){
                byte[] data = "{\"error\":\"无法找到路由\"}".getBytes();
                DataBuffer buffer = response.bufferFactory().wrap(data);
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
                return response.writeWith(Mono.just(buffer));
            }

            try{
                URI originalUri = request.getURI();
                String newUriStr = originalUri.getScheme() + "://" +config.getHost() + path.get();
                URI newUri = new URI(newUriStr);
                log.info("newUri {} {}",newUri,originalUri);
                ServerHttpRequest newRequest = request.mutate()
                        .uri(newUri)
                        .path(path.get())
                        .build();
                ServerWebExchange newExchange = exchange.mutate()
                        .request(newRequest).build();

                //写入旧目的地和新目的地
                newExchange.getAttributes().put(CustomUriFilter.URI_KEY,newUri);
                return chain.filter(newExchange);
            }catch(URISyntaxException e){
                throw new RuntimeException(e);
            }
        };
    }

    @Data
    public static class TenantAndPathRoute{
        private String tenantId;

        private String path;
    }

    @Data
    public static class Config {
        // 控制是否开启认证
        private List<TenantAndPathRoute> routes = new ArrayList<>();

        private String host;
    }
}
