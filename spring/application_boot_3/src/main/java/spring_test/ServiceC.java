package spring_test;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/4/12.
 */
@ConfigurationProperties(prefix="myapp.mail2")
public class ServiceC {
    private String name;

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
}

