package spring_test;

import org.springframework.stereotype.Component;

@Component
public class ServiceC {

    public String get(){
        return "HelloC";
    }

    public String get2(){
        return "MU";
    }
}
