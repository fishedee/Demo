package spring_test.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

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
        log.info("onLogoutSuccess......");
        addSameDomain(response);
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        String result = mapper.writeValueAsString(new MyResponseBodyAdvice.ResponseResult(0,"",null));

        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.flush();
    }

    private void addSameDomain(HttpServletResponse response) {
        //参考这里,https://stackoverflow.com/questions/63939078/how-to-set-samesite-and-secure-attribute-to-jsessionid-cookie/63939775#63939775
        //还有这里,https://stackoverflow.com/questions/49697449/how-to-enable-samesite-for-jsessionid-cookie
        //SameSite的问题,https://zhuanlan.zhihu.com/p/266282015
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        boolean firstHeader = true;
        for (String header : headers) { // there can be multiple Set-Cookie attributes
            if (firstHeader) {
                response.setHeader(HttpHeaders.SET_COOKIE, String.format("%s; %s", header, "domain=test.com"));
                firstHeader = false;
                continue;
            }
            response.addHeader(HttpHeaders.SET_COOKIE, String.format("%s; %s", header, "domain=test.com"));
        }
    }
}