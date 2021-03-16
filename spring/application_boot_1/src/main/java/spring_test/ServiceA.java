package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceA {

    @Autowired
    private ServiceADepend serviceADepend;

    public void showAnimal(){
        System.out.println("showAnimal : "+this.serviceADepend.getAnimal());
    }
}
