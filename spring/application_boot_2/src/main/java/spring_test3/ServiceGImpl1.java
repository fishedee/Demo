package spring_test3;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
public class ServiceGImpl1 implements ServiceG {
    public void go(){
        System.out.println("serviceG go impl1");
    }
}
