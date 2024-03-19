package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
        OrderDO2[] c = {};
        OrderDO2.Item mm = new OrderDO2.Item();
        System.out.println(c.getClass());
        System.out.println(mm.getClass());
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
