package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Slf4j
public class MainConfig  {
    //两个bean，其中二选一
    @Bean
    public TomcatContextCustomizer sameSiteCookiesConfig() {
        return context -> {
            TOMCAT_CONTEXT = context;
            log.info("session timeout {} minutes", context.getSessionTimeout());
        };
    }


    public static org.apache.catalina.Context TOMCAT_CONTEXT;
}
