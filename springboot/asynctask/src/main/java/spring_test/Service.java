package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Service {

    /*
    无需打开@EnableAspectJAutoProxy(exposeProxy = true)
    无需打开@EnableTransactionManagement(proxyTargetClass = true)
    只需打开@EnableAsync
    就能使用
     */
    @Async
    public void goAsync()throws Exception{
        this.goNoAsync();
    }

    public void goNoAsync() throws Exception{
        log.info("origin begin long task");
        Thread.sleep(5000);
        log.info("origin end long task");
    }
}
