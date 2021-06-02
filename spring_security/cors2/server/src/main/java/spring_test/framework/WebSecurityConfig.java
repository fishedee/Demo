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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.sql.DataSource;
import java.util.Arrays;

/**
 * Created by fish on 2021/4/26.
 */
@Configuration
//这里可以打开debug模式
@EnableWebSecurity(debug=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private MyUserDetailService myUserDetailService;

    @Autowired
    private HttpAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private MyAccessDeniedHandler accessDeniedHandler;

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

    //重置密码编码器
    @Bean
    public PasswordEncoder passwordEncoder(){
        PasswordEncoder encoder = new BCryptPasswordEncoder(12);
        return encoder;
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return myUserDetailService;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailService)
                .passwordEncoder(passwordEncoder());

    }

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);

        http.
                //开启csrf
                csrf()
                .disable()
                //默认的headerName为"X-XSRF-TOKEN";
                //默认的cookieName为"XSRF-TOKEN";
                //默认的parameterName的"_csrf";
                //可以看一下CookieCsrfTokenRepository的源代码
                //.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                //.and()
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
                .tokenRepository(jdbcTokenRepository)
                .tokenValiditySeconds(60 * 60)
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
                .anyRequest().authenticated()
                .and()
                .cors();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://client.test.com","http://client.test.com"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }
}
