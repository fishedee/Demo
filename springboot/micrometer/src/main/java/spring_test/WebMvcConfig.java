package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Created by fish on 2021/5/31.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private LogTimeHandlerInterceptor logTimeHandlerInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(logTimeHandlerInterceptor);
    }
}
