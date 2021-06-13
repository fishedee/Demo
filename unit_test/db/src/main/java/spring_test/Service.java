package spring_test;

import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class Service {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void add(User user){
        this.userRepository.add(user);

        //在这里可以用currentProxy
        Service c = (Service) AopContext.currentProxy();
        System.out.println(c);
    }

}
