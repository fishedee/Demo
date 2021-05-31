package spring_test.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import java.io.IOException;
import java.io.PrintWriter;

//授权入口,发现用户未登陆,或者授权的权限不足的情况
@Component
public class HttpAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Autowired
    ObjectMapper mapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException{
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        String result = mapper.writeValueAsString(new MyResponseBodyAdvice.ResponseResult(1,"未登录",null));

        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }
}
