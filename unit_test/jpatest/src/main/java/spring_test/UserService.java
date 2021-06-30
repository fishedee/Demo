package spring_test;

import org.springframework.stereotype.Component;

@Component
public class UserService {
    public String getDefaultName(){
        return "mm";
    }
}
