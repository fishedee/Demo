package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceB {
    @Autowired
    @Qualifier("serviceBDepend1")
    private ServiceBDepend serviceBDepend;

    public void play(){
        System.out.println("we are playing in : "+this.serviceBDepend.getPlace());
    }
}
