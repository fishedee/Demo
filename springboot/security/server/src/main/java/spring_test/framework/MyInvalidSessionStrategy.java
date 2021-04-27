package spring_test.framework;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.stereotype.Component;
import spring_test.business.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by fish on 2021/4/27.
 */
//会话过期的策略,不应该被设置,因为会话虽然过期,但是可以通过Remember-Me登录
@Component
public class MyInvalidSessionStrategy implements InvalidSessionStrategy {
    @Autowired
    private ObjectMapper mapper;

    @Override
    public void onInvalidSessionDetected(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        String result = mapper.writeValueAsString(new MyResponseBodyAdvice.ResponseResult(0,"你的会话过期了,请重新登录",new User ("","", User.Role.Admin)));
        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }

}
