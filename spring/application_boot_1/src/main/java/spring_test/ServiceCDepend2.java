package spring_test;

import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component("piano")
public class ServiceCDepend2 implements ServiceCDepend {
    public String getInstrument(){
        return "piano";
    }
}
