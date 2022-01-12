package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@Slf4j
public class MyScheduAsyncService {

    private SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Scheduled(cron = "*/5 * * * * *")
    @Async
    //秒，分，小时，日，月，年或者星期
    public void cronTask(){
        log.info("async cronTask: {}",ft.format(new Date()));
    }
    /*
    输出为：
    async cronTask: 2022-01-12 21:25:41
    async cronTask: 2022-01-12 21:25:45
    async cronTask: 2022-01-12 21:25:50
     */

    @Scheduled(fixedRate = 5000)
    @Async
    public void fixedRateTask()throws Exception{
        log.info("async fixedRateTask: {}",ft.format(new Date()));
        Thread.sleep(1000);
    }
    /*
    输出为：
    async fixedRateTask: 2022-01-12 21:25:39
    async fixedRateTask: 2022-01-12 21:25:44
    async fixedRateTask: 2022-01-12 21:25:49
     */

    @Scheduled(fixedDelay = 5000)
    @Async
    public void fixedDelayTask()throws Exception{
        log.info("async fixedDelayTask: {}",ft.format(new Date()));
        Thread.sleep(1000);
    }
    /*
    输出为：
    async fixedDelayTask: 2022-01-12 21:25:40
    async fixedDelayTask: 2022-01-12 21:25:45
    async fixedDelayTask: 2022-01-12 21:25:50
    每个任务都是一个独立的async，这使得delay的配置失效了
     */

    @Scheduled(fixedDelay = 5000,initialDelay = 1000)
    @Async
    public void fixedDelayAndInitialDelayTask()throws Exception{
        log.info("async fixedDelayAndInitialDelayTask: {}",ft.format(new Date()));
        Thread.sleep(1000);
    }
    /*
    输出为：
    async fixedDelayAndInitialDelayTask: 2022-01-12 21:25:41
    async fixedDelayAndInitialDelayTask: 2022-01-12 21:25:47
    有初始化延迟，但是没有之间延迟
     */
}

