package spring_test;

import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceADepend {

    public String getAnimal(){
        return "fish";
    }
}
