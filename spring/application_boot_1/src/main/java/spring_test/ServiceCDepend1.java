package spring_test;

import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component("guitar")
public class ServiceCDepend1 implements  ServiceCDepend {
    public String getInstrument(){
        return "guitar";
    }
}
