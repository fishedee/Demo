package spring_test;

import org.springframework.cloud.gateway.handler.predicate.AbstractRoutePredicateFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;

@Component
public class CheckTenantRoutePredicateFactory extends AbstractRoutePredicateFactory<CheckTenantRoutePredicateFactory.Config> {

    public CheckTenantRoutePredicateFactory() {
        super(Config.class);
    }

    /*
    shortcutFieldOrder

shortcutFieldOrder 是 AbstractRoutePredicateFactory 类中的一个方法，用于定义你的配置类中的字段顺序。它在Spring Cloud Gateway中用于支持断言和过滤器的简写形式。

在一个路由配置中，断言和过滤器通常以键-值对的形式出现，如下面的例子所示：

yaml
Copy code
spring:
  cloud:
    gateway:
      routes:
      - id: sample_route
        uri: http://localhost:8080
        predicates:
        - Path=path:/sample/**, method:GET
在这个例子中，Path 断言有两个参数，一个是路径模式，另一个是请求方法。这种形式是完整形式，有时候会显得过于冗长。

为了让配置更简洁，Spring Cloud Gateway提供了一种简写形式。这就需要使用到 shortcutFieldOrder 方法。它返回一个字段名的列表，定义了这些字段在简写形式中的顺序。

例如，如果 shortcutFieldOrder 返回 ["pattern", "method"]，那么我们就可以将上面的配置简写为：

yaml
Copy code
spring:
  cloud:
    gateway:
      routes:
      - id: sample_route
        uri: http://localhost:8080
        predicates:
        - Path=/sample/**, GET
     */
    @Override
    public List<String> shortcutFieldOrder() {
        return Collections.singletonList("tenantId");
    }

    //检查是否匹配路由
    @Override
    public Predicate<ServerWebExchange> apply(Config config) {
        return exchange -> {
            String queryValue = exchange.getRequest().getQueryParams().getFirst("tenantId");
            return config.getTenantId().equals(queryValue);
        };
    }

    public static class Config {
        private String tenantId;

        public String getTenantId() {
            return tenantId;
        }

        public void setTenantId(String tenantId) {
            this.tenantId = tenantId;
        }
    }
}
