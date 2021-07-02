package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
public class TestLocalDate {
    @Test
    public void testLocalDateNew(){
        //获取今天日期
        LocalDate date = LocalDate.now();
    }


    @Test
    public void testLocalDateGet(){
        LocalDate date = LocalDate.of(2021,6,30);

        //没有month的坑
        assertEquals(date.getYear(),2021);
        assertEquals(date.getMonth().getValue(),6);
        assertEquals(date.getDayOfMonth(),30);
        assertEquals(date.getDayOfWeek().getValue(),3);
    }


    @Test
    public void testLocalDateSet(){
        LocalDate date = LocalDate.of(2021,6,30);

        //LocalDate都是Immutable的，可以在跨线程下使用，每次变化都创建新的Date
        LocalDate date2 = date.withYear(2022);
        assertEquals(date2.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),"2022-06-30");

        LocalDate date3 = date2.withMonth(7);
        LocalDate date4 = date3.withDayOfMonth(20);
        assertEquals(date4.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),"2022-07-20");
    }

    @Test
    public void testLocalDateFormatAndParse(){
        LocalDate date = LocalDate.of(2021,6,30);

        //format
        String formater = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        assertEquals(formater,"2021-06-30");

        //parse
        LocalDate date2 = LocalDate.parse("2022-07-28",DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        assertEquals(date2.getYear(),2022);
        assertEquals(date2.getMonth().getValue(),7);
        assertEquals(date2.getDayOfMonth(),28);
    }

    @Test
    public void testLocalDateDuration(){
        LocalDate date = LocalDate.of(2021,6,30);
        LocalDate date2 = LocalDate.of(2021,7,30);


        //LocalDate不能用Duration，Duration是秒级的
        //Duration duration = Duration.between(date,date2);

        Period period = Period.between(date,date2);
        assertEquals(period.toString(),"P1M");
    }
}
