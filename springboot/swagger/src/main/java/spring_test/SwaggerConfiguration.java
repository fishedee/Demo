package spring_test;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableOpenApi
@Profile("development")
public class SwaggerConfiguration {
    //api接口包扫描路径
    public static final String SWAGGER_SCAN_BASE_PACKAGE = "spring_test";
    public static final String VERSION = "1.0.0";

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage(SWAGGER_SCAN_BASE_PACKAGE))
                .paths(PathSelectors.any()) // 可以根据url路径设置哪些请求加入文档，忽略哪些请求
                .build();
    }

    //http://localhost:8080/swagger-ui/
    //http://localhost:8080/v2/api-docs
    //http://localhost:8080/v3/api-docs
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("测试服务") //设置文档的标题
                .description("测试服务API接口文档") // 设置文档的描述
                .version(VERSION) // 设置文档的版本信息-> 1.0.0 Version information
                .termsOfServiceUrl("https://www.baidu.com") // 设置文档的License信息->1.3 License information
                .build();
    }
}
