package spring_test.framework;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.authentication.switchuser.SwitchUserFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.session.SessionManagementFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;

/**
 * Created by fish on 2021/4/26.
 */
@Configuration
//这里可以打开debug模式
//可以看到请求过来的Request Cookie与Body
//在POSTMAN中,GET请求仅需要设置Cookie字段就可以访问了
//POST请求需要额外添加X-XSRF-TOKEN的header
@EnableWebSecurity(debug=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService myUserDetailService;

    @Autowired
    private HttpAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private MyAccessDeniedHandler accessDeniedHandler;


    @Autowired(required = false)
    MyAuthSuccessHandler myAuthSuccessHandler;

    @Autowired
    private AuthSuccessHandler authSuccessHandler;

    @Autowired
    private AuthFailureHandler authFailureHandler;

    @Autowired
    private MySessionInformationExpiredStrategy sessionInformationExpiredStrategy;

    @Autowired
    private MyInvalidSessionStrategy invalidSessionStrategy;

    @Autowired
    private HttpLogoutSuccessHandler logoutSuccessHandler;

    @Autowired
    private PersistentTokenRepository persistentTokenRepository;

    //重置密码编码器
    @Bean
    public PasswordEncoder passwordEncoder(){
        PasswordEncoder encoder = new BCryptPasswordEncoder(12);
        return encoder;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailService)
                .passwordEncoder(passwordEncoder());

    }

    @Autowired
    private DataSource dataSource;

    @Bean
    public SwitchUserFilter switchUserFilter(){
        SwitchUserFilter filter = new SwitchUserFilter();
        filter.setUserDetailsService(myUserDetailService);
        filter.setSwitchUserUrl("/login/impersonate");
        filter.setSuccessHandler(authSuccessHandler);
        filter.setFailureHandler(authFailureHandler);
        return filter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.
                //开启csrf
                csrf()
                //默认的headerName为"X-XSRF-TOKEN";
                //默认的cookieName为"XSRF-TOKEN";
                //默认的parameterName的"_csrf";
                //可以看一下CookieCsrfTokenRepository的源代码
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                //设置认证异常与授权异常的处理
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
                .and()
                //表单登录的处理
                //必须要用urlEncode的参数来传入
                .formLogin()
                .permitAll()
                .loginProcessingUrl("/login/login")
                .usernameParameter("user")//登录的用户名字段名称
                .passwordParameter("password")//登录的密码字段名称
                .successHandler(authSuccessHandler)
                .failureHandler(authFailureHandler)
                .and()
                //记住我,必须用check-box传入一个remeber-me的字段
                //使用记住我以后,maximumSessions为1是没有意义的,因为他能被自动登录
                .rememberMe()
                .userDetailsService(myUserDetailService)
                .tokenRepository(persistentTokenRepository)
                .tokenValiditySeconds(60 * 60)
                .authenticationSuccessHandler(new AuthenticationSuccessHandler(){
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication var3) throws IOException, ServletException{
                        if( myAuthSuccessHandler != null ){
                            myAuthSuccessHandler.handle(false);
                        }
                    }
                })
                .and()
                //登出的处理
                .logout()
                .permitAll()
                .logoutUrl("/login/logout")
                .logoutSuccessHandler(logoutSuccessHandler)
                .and()
                //单个用户的最大可在线的会话数
                .sessionManagement()
                //.invalidSessionStrategy(invalidSessionStrategy)
                .maximumSessions(1)
                .expiredSessionStrategy(sessionInformationExpiredStrategy);

        http.authorizeRequests()
                .antMatchers("/login/login").permitAll()
                .antMatchers("/login/islogin").permitAll()
                .anyRequest().authenticated();

        http.addFilterAfter(switchUserFilter(), FilterSecurityInterceptor.class);
    }
}
