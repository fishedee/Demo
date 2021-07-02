package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Date;

@Slf4j
public class TestDuration {
    @Test
    public void go(){
        //2021年6月30日 16:51:48 CST
        Date begin = new Date(1625043108660L);

        //2021年6月30日 19:38:28 CST
        Date end = new Date(1625053108660L);

        Duration duration = Duration.between(begin.toInstant(),end.toInstant());
        //PT2H46M40S，代表2小时，36分钟，40秒。
        //getSeconds可以转换为秒级的说明
        log.info("duration {} {}秒",duration,duration.getSeconds());
    }

    @Test
    public void go2(){
        //从秒级转换为Duration
        Duration duration = Duration.ofSeconds(100);
        log.info("duration {}秒",duration.getSeconds());
    }
}
