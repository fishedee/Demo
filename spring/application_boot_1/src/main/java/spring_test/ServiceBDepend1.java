package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceBDepend1 implements ServiceBDepend{
    public String getPlace(){
        return "home";
    }
}
