package spring_test.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by fish on 2021/4/26.
 */
//登出成功的处理器
@Component
@Slf4j
public class HttpLogoutSuccessHandler implements LogoutSuccessHandler {
    @Autowired
    private ObjectMapper mapper;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        String result = mapper.writeValueAsString(new MyResponseBodyAdvice.ResponseResult(0,"",null));

        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }
}