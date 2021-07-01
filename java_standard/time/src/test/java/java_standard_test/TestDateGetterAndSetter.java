package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
public class TestDateGetterAndSetter {

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

    //Calendar是时间的处理方法，两者是分开的，不同的存储方式
    @Test
    public void testCalendarGet(){
        //2021年6月30日 16:51:48 CST
        Date now = new Date(1625043108660L);

        //Calendar使用工厂模式生成
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        //基础信息的获取
        assertEquals(calendar.get(Calendar.YEAR),2021);
        //注意month必须加1，才是正确的month
        assertEquals(calendar.get(Calendar.MONTH)+1,6);
        assertEquals(calendar.get(Calendar.DAY_OF_MONTH),30);
        assertEquals(calendar.get(Calendar.HOUR_OF_DAY),16);
        assertEquals(calendar.get(Calendar.MINUTE),51);
        assertEquals(calendar.get(Calendar.SECOND),48);
        assertEquals(calendar.get(Calendar.MILLISECOND),660);

        //获取这个月的天数范围，注意用getActualMaximum和getActualMinimum，不要用getMaximum和getMinimum
        assertEquals(calendar.getActualMinimum(Calendar.DAY_OF_MONTH),1);
        assertEquals(calendar.getActualMaximum(Calendar.DAY_OF_MONTH),30);
    }

    @Test
    public void testCalendarSet(){
        //2021年6月30日 16:51:48 CST
        Date now = new Date(1625043108660L);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        //设置月份为8月
        calendar.set(Calendar.MONTH,8-1);

        //注意month必须加1，才是正确的month
        assertEquals(calendar.get(Calendar.YEAR),2021);
        assertEquals(calendar.get(Calendar.MONTH)+1,8);
        assertEquals(calendar.get(Calendar.DAY_OF_MONTH),30);
        assertEquals(calendar.get(Calendar.HOUR_OF_DAY),16);
        assertEquals(calendar.get(Calendar.MINUTE),51);
        assertEquals(calendar.get(Calendar.SECOND),48);
        assertEquals(calendar.get(Calendar.MILLISECOND),660);

        //从Calendar转换到了Date
        Date now2 = calendar.getTime();
        log.info("now2 {}",now2);
    }

    @Test
    public void testCalendarAdd(){
        //2021年6月30日 16:51:48 CST
        Date now = new Date(1625043108660L);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        //对当前时间加1天
        calendar.add(Calendar.DAY_OF_MONTH,1);

        //注意month必须加1，才是正确的month
        assertEquals(calendar.get(Calendar.YEAR),2021);
        assertEquals(calendar.get(Calendar.MONTH)+1,7);
        assertEquals(calendar.get(Calendar.DAY_OF_MONTH),1);
        assertEquals(calendar.get(Calendar.HOUR_OF_DAY),16);
        assertEquals(calendar.get(Calendar.MINUTE),51);
        assertEquals(calendar.get(Calendar.SECOND),48);
        assertEquals(calendar.get(Calendar.MILLISECOND),660);

        //从Calendar转换到了Date
        Date now2 = calendar.getTime();
        log.info("now2 {}",now2);
    }
}
