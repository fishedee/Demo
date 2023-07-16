package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import spring_test.business.User;
import spring_test.framework.MyUserDetail;
import spring_test.infrastructure.UserRepository;

@Component
@Slf4j
public class MyTenantUserDetailService implements UserDetailsService {
    private UserRepository userRepository;

    public MyTenantUserDetailService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        if( tenantId == null ){
            throw new UsernameNotFoundException("缺少租户参数");
        }
        MyTenantHolder.setTenantId(tenantId);

        User user = userRepository.getByNameForRead(username);
        if( user ==  null){
            //这个异常是固定的,不能改其他的
            throw new UsernameNotFoundException("用户不存在");
        }
        return new MyUserDetail(user);
    }
}
