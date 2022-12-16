package java_test;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

//看这里https://www.cnblogs.com/zhongjunbo555/p/11383159.html
public class BasicTest {

    @Test
    public void stringFormatTest(){
        //正数格式%[index$][标识][最小宽度]转换方式
        //数字表示占用位数，默认空格占位，前补0表示用0占位，逗号为三位法
        String str1 = String.format("%d- %2d-%03d-%,d",1,1,1,99999);
        assertEquals(str1,"1-  1-001-99,999");
        //十进制，十六进制和八进制
        String str2 = String.format("%d %x %o",10,10,10);
        assertEquals(str2,"10 a 12");
        //xxx$可以指定输出的参数index
        String str3 = String.format("%2$d %2$d %1$d",10,20);
        assertEquals(str3,"20 20 10");
        //浮点数[标识][最小宽度]转换方式，5是指总宽度，包括小数点，整数位，和小数位。
        String str4 = String.format("%.2f-%5.2f-%05.2f",1.23,1.4444,1.2);
        assertEquals(str4,"1.23- 1.44-01.20");
        //字符串和字符
        String str5 = String.format("%s,%c","--MM--",65);
        assertEquals(str5,"--MM--,A");
    }
}
