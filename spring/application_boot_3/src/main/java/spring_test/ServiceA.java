package spring_test;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceA {
    @Value("${study.testStr}")
    private String testStr;

    @Value("#{serviceB.host}")
    private String emailHost;

    public void go(){
        System.out.println("servierA go : "+this.testStr);

        System.out.println("serviceA get host : "+this.emailHost);
    }
}
