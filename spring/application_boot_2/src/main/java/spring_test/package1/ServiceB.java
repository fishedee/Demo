package spring_test.package1;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceB {
    public void go(){
        System.out.println("serviceB go");
    }
}
