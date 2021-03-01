package spring_test;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.EmbeddedValueResolverAware;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.util.StringValueResolver;

public class ServiceB implements EnvironmentAware,EmbeddedValueResolverAware, ApplicationContextAware{
    public ServiceB(){
        System.out.println("serviceB constructor");
    }

    //获取,环境变量
    private Environment environment;
    public void setEnvironment(Environment var1){
        this.environment = var1;
    }

    //获取,配置文件的字符串解析器
    private StringValueResolver stringValueResolver;
    public void setEmbeddedValueResolver(StringValueResolver var1){
        this.stringValueResolver = var1;
    }

    //获取,应用程序上下文
    private ApplicationContext applicationContext;
    public void setApplicationContext(ApplicationContext var1) throws BeansException{
        this.applicationContext = var1;
    }

    public void show(){
        System.out.println("environment:"+this.environment);
        System.out.println("stringValueResolver:"+this.stringValueResolver);
        System.out.println("applicationContext:"+this.applicationContext);
    }
}
