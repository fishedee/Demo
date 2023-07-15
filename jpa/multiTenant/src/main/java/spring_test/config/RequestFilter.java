package spring_test.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.handler.WebRequestHandlerInterceptorAdapter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//需要在@Transiactional之前就配置好
//之前对于静态文件，icon文件的拉取是没有租户标识的
@Slf4j
@Component
public class RequestFilter extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String tenantId = request.getParameter("tenantId");
        if (tenantId != null && Strings.isNotBlank(tenantId) ){
            CurrentTenantHolder.setTenantId(tenantId);
        }
        return true;
    }
}
