package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@Slf4j
public class MyScheduService {

    private SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Scheduled(cron = "*/5 * * * * *")
    //秒，分，小时，日，月，年或者星期
    public void cronTask(){
        log.info("cronTask: {}",ft.format(new Date()));
    }
    /*
    输出为：
    cronTask: 2022-01-12 21:20:25
    cronTask: 2022-01-12 21:20:30
    cronTask: 2022-01-12 21:20:35
     */

    @Scheduled(fixedRate = 5000)
    public void fixedRateTask()throws Exception{
        log.info("fixedRateTask: {}",ft.format(new Date()));
        Thread.sleep(1000);
    }
    /*
    输出为：
    fixedRateTask: 2022-01-12 21:20:25
    fixedRateTask: 2022-01-12 21:20:30
    fixedRateTask: 2022-01-12 21:20:35
     */

    @Scheduled(fixedDelay = 5000)
    public void fixedDelayTask()throws Exception{
        log.info("fixedDelayTask: {}",ft.format(new Date()));
        Thread.sleep(1000);
    }
    /*
    输出为：
    fixedDelayTask:2022-01-12 21:20:27
    fixedDelayTask: 2022-01-12 21:20:33
    fixedDelayTask: 2022-01-12 21:20:39
     */

    @Scheduled(fixedDelay = 5000,initialDelay = 1000)
    public void fixedDelayAndInitialDelayTask()throws Exception{
        log.info("fixedDelayAndInitialDelayTask: {}",ft.format(new Date()));
        Thread.sleep(1000);
    }
    /*
    输出为：
    fixedDelayAndInitialDelayTask: 2022-01-12 21:20:28
    fixedDelayAndInitialDelayTask: 2022-01-12 21:20:34
    fixedDelayAndInitialDelayTask: 2022-01-12 21:20:41
     */
}
