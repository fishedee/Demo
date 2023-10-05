package spring_test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.Session;
import org.apache.catalina.core.StandardContext;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
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

import javax.persistence.Access;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by fish on 2021/4/26.
 */
@RestController
@RequestMapping("/session")
@Slf4j
public class SessionController {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Accessors(chain = true)
    public static class SessionInfo {
        private String id;

        private Date createTime;

        private Date lastActiveTime;

        private Integer maxIdleSecond;

        private Long currentIdleMilliSecond;

        private Map<String,String> attributes;
    }

    @GetMapping("/getAll")
    public List<SessionInfo> getAll(HttpServletRequest request){
        Session[] sessions = MainConfig.TOMCAT_CONTEXT.getManager().findSessions();
        return Arrays.stream(sessions).map(single->{
            Map<String,String> attributes = new HashMap<>();
            HttpSession s = single.getSession();
            Enumeration<String> names = s.getAttributeNames();
            while( names.hasMoreElements() ){
                String name = names.nextElement();
                String value = s.getAttribute(name).toString();
                attributes.put(name,value);
            }
            return new SessionInfo()
                    .setId(single.getId())
                    .setCreateTime(new Date(single.getCreationTime()))
                    .setLastActiveTime(new Date(single.getLastAccessedTime()))
                    .setMaxIdleSecond(single.getMaxInactiveInterval())
                    .setCurrentIdleMilliSecond(single.getIdleTimeInternal())
                    .setAttributes(attributes);
        }).collect(Collectors.toList());
    }
}
