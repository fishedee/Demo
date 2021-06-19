package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ServiceA {

    @Autowired
    private ServiceB serviceB;

    public String get(){
        return "A"+serviceB.get();
    }
}
