package spring_test.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import spring_test.business.User;
import spring_test.infrastructure.UserRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by fish on 2021/4/26.
 */
//认证成功的处理器
@Component
public class AuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthSuccessHandler.class);

    @Autowired
    ObjectMapper mapper = new ObjectMapper();

    @Autowired(required = false)
    MyAuthSuccessHandler myAuthSuccessHandler;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(javax.servlet.http.HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
        User user = userRepository.find(userDetails.getUserId());

        if( myAuthSuccessHandler != null ){
            myAuthSuccessHandler.handle(true);
        }

        String result = mapper.writeValueAsString(new MyResponseBodyAdvice.ResponseResult(0,"",user));

        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }
}