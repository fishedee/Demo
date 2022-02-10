package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

@Component
@Slf4j
public class UserHolder {

    private final static String ATTR_NAME= "user";

    private User getFromDb(){
        log.info("getFromDb User");
        return new User("fish",120);
    }

    public User get(){
        RequestAttributes reqattr = RequestContextHolder.getRequestAttributes();
        Object result = reqattr.getAttribute(ATTR_NAME,RequestAttributes.SCOPE_REQUEST);
        if( result != null ){
            return (User)result;
        }
        User result2 = this.getFromDb();
        reqattr.setAttribute(ATTR_NAME,result2,RequestAttributes.SCOPE_REQUEST);
        reqattr.registerDestructionCallback(ATTR_NAME,()->{
            log.info("release user");
        },RequestAttributes.SCOPE_REQUEST);
        return result2;
    }
}
