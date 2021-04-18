package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Address;
import spring_test.business.User;
import spring_test.infrastructure.UserRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class UserTest {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Long add(User user){
        this.userRepository.add(user);
        return user.getId();
    }

    @Transactional
    public void mod(Long id,String name,Address address){
        User country = this.userRepository.find(id);
        if(country == null){
            throw new RuntimeException("找不到"+id+"的用户");
        }
        country.mod(name,address);
    }

    public void showAll(){
        List<User> all = this.userRepository.getAll();
        log.info("all User {}",all);
    }

    public void go(){
        UserTest app = (UserTest) AopContext.currentProxy();

        Long id = app.add(new User("Fish",new Address("中国","杭州","北京路","1231")));
        app.showAll();

        app.mod(id,"cat",new Address("美国","德克萨斯洲","建国路","1231"));
        app.showAll();
    }
}
