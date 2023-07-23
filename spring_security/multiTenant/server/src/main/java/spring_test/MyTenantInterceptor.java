package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import spring_test.framework.MyException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
public class MyTenantInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        MyTenantHolder.setTenantId(tenantId);
        //检查cookie与session是否一致
        SecurityContextImpl securityContextImpl = (SecurityContextImpl)request.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
        if( securityContextImpl != null ){
            //FIXME,前端需要对以下错误进行处理，收到以下错误以后自动跳转到登录页面
            MyTenantUserDetails userDetail = (MyTenantUserDetails)securityContextImpl.getAuthentication().getPrincipal();

            log.info("tenantId {}, loginInfo {}",tenantId,userDetail);
            if( userDetail.getTenantId() == null ){
                throw new MyException(1,"缺少租户ID",null);
            }
            if( tenantId.equals(userDetail.getTenantId()) == false ){
                throw new MyException(1,"租户ID不一致",null);
            }
        }
        return true;
    }
}
