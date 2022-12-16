package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
public class Service2 {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Async
    public void goAsyncInner()throws Exception{
        log.info("begin long task2");
        Thread.sleep(5000);
        log.info("end long task2");
    }

    /*
    要使用(Service2)AopContext.currentProxy()的话
    需要打开@EnableAspectJAutoProxy(exposeProxy = true)
    需要打开MyBeanFactoryPostProcessor，或者@Transactional
     */
    //@Transactional会指定将该对象放入Advised名单
    //@Transactional
    public void goAsync()throws Exception{
        Service2 service2 = (Service2)AopContext.currentProxy();
        service2.goAsyncInner();
    }

    public void goNoAsync() throws Exception{
        log.info("begin long task");
        Thread.sleep(5000);
        log.info("end long task");
    }
}
