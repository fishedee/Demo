package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.config.CurrentTenantHolder;

@Component
@Slf4j
public class UserHelper {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void addUser(String name){
        User user = new User(name);
        this.userRepository.add(user);
    }

}
