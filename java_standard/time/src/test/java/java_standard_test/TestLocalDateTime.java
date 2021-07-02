package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
public class TestLocalDateTime {
    @Test
    public void testLocalDateTimeNew(){
        //获取今天日期
        LocalDateTime date = LocalDateTime.now();


    }

    @Test
    public void testLocalDateTimeGet(){
        //用指定的日期创建LocalDate
        LocalDateTime date = LocalDateTime.of(2021,6,30,12,30,59);

        //没有month的坑
        assertEquals(date.getYear(),2021);
        assertEquals(date.getMonth().getValue(),6);
        assertEquals(date.getDayOfMonth(),30);
        assertEquals(date.getDayOfWeek().getValue(),3);
        assertEquals(date.getHour(),12);
        assertEquals(date.getMinute(),30);
        assertEquals(date.getSecond(),59);
    }

    @Test
    public void testLocalDateTimeSet(){
        LocalDateTime date = LocalDateTime.of(2021,6,30,18,30,59);

        //LocalDateTime都是Immutable的，可以在跨线程下使用，每次变化都创建新的Date
        LocalDateTime date2 = date.withYear(2022);
        assertEquals(date2.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),"2022-06-30 18:30:59");

        LocalDateTime date3 = date2.withMonth(7);
        LocalDateTime date4 = date3.withDayOfMonth(20);
        LocalDateTime date5 = date4.withHour(20);
        assertEquals(date5.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),"2022-07-20 20:30:59");
    }

    @Test
    public void testLocalDateTimeFormatAndParse(){
        LocalDateTime date = LocalDateTime.of(2021,6,30,18,30,59);

        //format
        String formater = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        assertEquals(formater,"2021-06-30 18:30:59");

        String formater2 = date.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        assertEquals(formater2,"2021-06-30T18:30:59");

        //parse
        LocalDateTime date2 = LocalDateTime.parse("2022-07-28 20:18:39",DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        assertEquals(date2.getYear(),2022);
        assertEquals(date2.getMonth().getValue(),7);
        assertEquals(date2.getDayOfMonth(),28);
        assertEquals(date2.getHour(),20);
        assertEquals(date2.getMinute(),18);
        assertEquals(date2.getSecond(),39);
    }

    @Test
    public void testLocalDateDuration(){
        LocalDateTime date = LocalDateTime.of(2021,6,30,18,30,59);
        LocalDateTime date2 = LocalDateTime.of(2021,7,30,19,22,33);


        //LocalDateTime不能用Period，Period是天数级的
        //Period period = Period.between(date,date2);

        Duration duration = Duration.between(date,date2);
        assertEquals(duration.toString(),"PT720H51M34S");
    }

    @Test
    public void testSpecialWith(){
        LocalDateTime date = LocalDateTime.of(2021,6,2,18,30,59);

        //该月的最后一个星期一
        LocalDateTime date2 = date.with(TemporalAdjusters.lastInMonth(DayOfWeek.MONDAY));
        assertEquals(date2.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),"2021-06-28 18:30:59");

        //该月的最后一天
        LocalDateTime date3 = date.with(TemporalAdjusters.lastDayOfMonth());
        assertEquals(date3.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),"2021-06-30 18:30:59");
    }

    @Test
    public void testZoned(){
        LocalDateTime date = LocalDateTime.of(2021,6,2,18,30,59);

        //带时区信息的时间
        ZonedDateTime zonedDateTime = date.atZone(ZoneId.systemDefault());
        assertEquals(zonedDateTime.format(DateTimeFormatter.ISO_ZONED_DATE_TIME),"2021-06-02T18:30:59+08:00[Asia/Shanghai]");

        //切换到其他时区
        ZonedDateTime zonedDateTime2 = ZonedDateTime.ofInstant(zonedDateTime.toInstant(),ZoneId.of("Asia/Yerevan"));
        assertEquals(zonedDateTime2.format(DateTimeFormatter.ISO_ZONED_DATE_TIME),"2021-06-02T14:30:59+04:00[Asia/Yerevan]");

    }
}
