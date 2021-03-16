package spring_test4;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import spring_test3.ServiceG;

/**
 * Created by fish on 2021/3/15.
 */
public class ServiceGImpl2 implements ServiceG {

    public void go(){
        System.out.println("serviceG go impl2");
    }
}