package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import spring_test.framework.MyAuthSuccessHandler;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

@Component
@Slf4j
public class MyTenantAuthSuccessHandler implements MyAuthSuccessHandler {
    @Override
    public void handle(boolean isFormLogin){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        //写入cookie
        try{
            String tenantIdEncode = java.net.URLEncoder.encode(tenantId, "UTF-8");
            Cookie nameCookie = new Cookie("tenantId", tenantIdEncode);
            //设置Cookie的有效时间，单位为秒
            nameCookie.setMaxAge(7*3600*24);
            nameCookie.setPath("/");
            nameCookie.setHttpOnly(true);
            //通过response的addCookie()方法将此Cookie对象保存到客户端浏览器的Cookie中
            response.addCookie(nameCookie);
        }catch(UnsupportedEncodingException e){
            throw new RuntimeException(e);
        }

        //写入session
        request.getSession().setAttribute("tenantId",tenantId);
    }
}
