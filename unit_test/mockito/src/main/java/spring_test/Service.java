package spring_test;

import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/5/30.
 */
@Component
public class Service {
    public String display(){
        return "mm";
    }

    public String display2(int a){return "mk"+a;}

    public void nothing(){}

    public void nothing2(int a){}
}
