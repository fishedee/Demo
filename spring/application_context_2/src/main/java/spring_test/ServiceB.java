package spring_test;

import org.springframework.beans.BeansException;
import org.springframework.context.*;
import org.springframework.core.env.Environment;
import org.springframework.util.StringValueResolver;

public class ServiceB implements ApplicationEventPublisherAware{
    public ServiceB(){
        System.out.println("serviceB constructor");
    }

    private ApplicationEventPublisher applicationEventPublisher;
    public void setApplicationEventPublisher(ApplicationEventPublisher var1){
        this.applicationEventPublisher = var1;
    }

    public void sendMsg(){
        this.applicationEventPublisher.publishEvent(new MyEvent("hello","msg"));
    }

    public void sendMsg2(){
        this.applicationEventPublisher.publishEvent(new MyEvent2("hello2","msg2"));
    }
}
