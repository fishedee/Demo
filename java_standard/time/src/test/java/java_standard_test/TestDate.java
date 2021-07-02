package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
public class TestDate {

    //Date作为时间的容量
    @Test
    public void testNow(){
        //获取当前时间，注意是java.util.Date，不是java.sql.Date
        Date now = new Date();
        log.info("now {}",now);

        //unix时间戳，以毫秒为单位的
        Long unix = now.getTime();
        log.info("unix time {}",unix);

        Date now2 = new Date(unix+1000);
        log.info("now add 1 second {}",now2);
    }
}
