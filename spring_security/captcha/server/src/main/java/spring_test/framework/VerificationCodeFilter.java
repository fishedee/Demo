package spring_test.framework;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.core.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by fish on 2021/6/3.
 */
@Component
@Slf4j
public class VerificationCodeFilter extends OncePerRequestFilter {

    @Autowired
    private AuthFailureHandler authFailureHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException{
        if( !"/login/login".equals(httpServletRequest.getRequestURI())){
            filterChain.doFilter(httpServletRequest,httpServletResponse);
        }else{
            try {
                vertifyCode(httpServletRequest, httpServletResponse);
                filterChain.doFilter(httpServletRequest, httpServletResponse);
            }catch(AuthenticationException e ){
                authFailureHandler.onAuthenticationFailure(httpServletRequest,httpServletResponse,e);
            }
        }
    }

    public void vertifyCode(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)throws AuthenticationException{
        String requestCode = httpServletRequest.getParameter("captcha");

        HttpSession session = httpServletRequest.getSession();
        String savedCode = (String)session.getAttribute("captcha");
        //清除验证码,只有一次尝试机会
        session.removeAttribute("captcha");

        if( StringUtils.isEmpty(requestCode) || StringUtils.isEmpty(savedCode) || ! requestCode.equals(savedCode)){
            throw new VertificationCodeException();
        }
    }
}
