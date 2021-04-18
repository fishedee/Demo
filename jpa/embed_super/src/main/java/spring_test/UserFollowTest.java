package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Address;
import spring_test.business.User;
import spring_test.business.UserFollow;
import spring_test.infrastructure.UserFollowRepository;
import spring_test.infrastructure.UserRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/18.
 */
@Component
@Slf4j
public class UserFollowTest {
    @Autowired
    private UserFollowRepository userFollowRepository;

    @Transactional
    public UserFollow.Id add(UserFollow userFollow){
        this.userFollowRepository.add(userFollow);
        return userFollow.getId();
    }

    public void showOne(UserFollow.Id id){
        UserFollow userFollow = this.userFollowRepository.find(id);
        log.info("userFollow {} is {}",id,userFollow);
    }

    public void showAll(){
        List<UserFollow> all = this.userFollowRepository.getAll();
        log.info("all UserFollow {}",all);
    }



    public void go(){
        UserFollowTest app = (UserFollowTest) AopContext.currentProxy();

        app.add(new UserFollow(10001L,30001L));
        app.add(new UserFollow(10001L,30002L));
        app.add(new UserFollow(10001L,30003L));
        app.add(new UserFollow(10001L,30004L));
        app.add(new UserFollow(10002L,30005L));
        UserFollow.Id id = app.add(new UserFollow(10002L,30006L));
        app.showAll();

        app.showOne(id);
        log.info("10001 follow {}",this.userFollowRepository.findByUserId(10001L));
        log.info("10002 follow {}",this.userFollowRepository.findByUserId(10002L));
    }
}
