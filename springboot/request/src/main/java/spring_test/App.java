package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Slf4j
public class App
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private RequestMappingHandlerAdapter adapter;

    @Autowired
    private MyRequestAdvice requestAdvice;

    @PostConstruct
    public void injectSelfMethodArgumentResolver() {
        List<HandlerMethodArgumentResolver> argumentResolvers = new ArrayList<>();
        argumentResolvers.add(requestAdvice);
        argumentResolvers.addAll(adapter.getArgumentResolvers());
        adapter.setArgumentResolvers(argumentResolvers);
    }
}
