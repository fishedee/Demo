package java_standard_test;

import org.junit.jupiter.api.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestDateFormat {
    @Test
    public void testFormat() {
        //2021年6月30日 16:51:48 CST
        Date now = new Date(1625043108660L);

        //24小时制，格式化输出
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        assertEquals(ft.format(now),"2021-06-30 16:51:48");

        //12小时制，格式化输出
        SimpleDateFormat ft2 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        assertEquals(ft2.format(now),"2021-06-30 04:51:48");
    }

    @Test
    public void testParse(){
        //2021年6月30日 16:51:48 CST
        Date now = new Date(1625043108000L);

        //24小时制，读取
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try{
            Date now2 = ft.parse("2021-06-30 16:51:48");
            assertEquals(now,now2);
        }catch(ParseException e){
            throw new RuntimeException(e);
        }
    }
}
