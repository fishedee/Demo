package spring_test.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.session.SessionInformationExpiredEvent;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by fish on 2021/4/27.
 */
@Component
public class MySessionInformationExpiredStrategy implements SessionInformationExpiredStrategy {
    @Autowired
    ObjectMapper mapper = new ObjectMapper();

    @Override
    public void onExpiredSessionDetected(SessionInformationExpiredEvent event) throws IOException, ServletException{
        HttpServletResponse response = event.getResponse();
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String result = mapper.writeValueAsString(new MyResponseBodyAdvice.ResponseResult(1,"你的账号在其他地方登录了",null));
        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }
}
