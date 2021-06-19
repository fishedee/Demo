package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/5/30.
 */
@Component
public class ServiceB {
    @Autowired
    private ServiceC serviceC;

    public String get(){
        return "B"+serviceC.get();
    }
}
