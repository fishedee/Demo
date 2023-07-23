package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import spring_test.business.User;
import spring_test.framework.MyException;
import spring_test.framework.MyUserDetail;
import spring_test.infrastructure.UserRepository;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by fish on 2021/4/26.
 */
@RestController
@RequestMapping("/login")
@Slf4j
public class LoginController {
    @Autowired
    PasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    UserRepository userRepository;

    @GetMapping("/islogin")
    public User islogin(){
        RequestAttributes requestAttributes =  RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
        SecurityContextImpl securityContextImpl = (SecurityContextImpl)request.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
        if( securityContextImpl == null ){
            return new User("","",null);
        }else{
            AbstractAuthenticationToken token = (AbstractAuthenticationToken) securityContextImpl.getAuthentication();
            MyTenantUserDetails userDetail = (MyTenantUserDetails)token.getPrincipal();
            return this.userRepository.find(userDetail.getUserId());
        }
    }
}
