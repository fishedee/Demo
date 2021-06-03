package spring_test.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by fish on 2021/4/26.
 */
//认证失败的处理器
@Component
public class AuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Autowired
    ObjectMapper mapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        MyResponseBodyAdvice.ResponseResult re ;
        if( exception instanceof VertificationCodeException){
            re = new MyResponseBodyAdvice.ResponseResult(1,"验证码错误",null);
        }else{
            re = new MyResponseBodyAdvice.ResponseResult(1,"账号或密码错误",null);
        }
        String result = mapper.writeValueAsString(re);
        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }
}
