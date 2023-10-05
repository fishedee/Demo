package spring_test.framework;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import spring_test.business.User;
import spring_test.infrastructure.UserRepository;

/**
 * Created by fish on 2021/4/26.
 */
@Component
@Slf4j
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user = userRepository.getByNameForRead(username);
        if( user ==  null){
            //这个异常是固定的,不能改其他的
            throw new UsernameNotFoundException("用户不存在");
        }
        return new MyUserDetail(user);
    }
}
