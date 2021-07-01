package java_standard_test;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TestString {
    @Test
    public void stringToInt(){
        //普通方法
        int data = Integer.valueOf("123").intValue();
        assertEquals(data,123);

        //另外一种的解析方法
        int data2 = Integer.parseInt("123");
        assertEquals(data2,123);
    }



    @Test
    public void stringToInt_radix(){
        //普通方法，带基数的处理
        int data = Integer.valueOf("100",16).intValue();
        assertEquals(data,256);

        //另外一种的解析方法，带基数的处理
        int data2 = Integer.parseInt("100",16);
        assertEquals(data2,256);
    }


    @Test
    public void stringToInt_invalid(){
        //没有字符是不行的
        assertThrows(NumberFormatException.class,()-> {
            int data4 = Integer.valueOf("").intValue();
            assertEquals(data4,123);
        });

        //前或者后有空格也是不行的
        assertThrows(NumberFormatException.class,()-> {
            int data3 = Integer.valueOf(" 123 ").intValue();
            assertEquals(data3,123);
        });

        //尾部有其他字符也是不行的
        assertThrows(NumberFormatException.class,()-> {
            int data2 = Integer.valueOf("123k").intValue();
            assertEquals(data2, 123);
        });

        //前部有其他字符也是不行的
        assertThrows(NumberFormatException.class,()->{
            int data = Integer.valueOf("k123").intValue();
            assertEquals(data,123);
        });
    }
    @Test
    public void intToString(){
        //有装箱操作，但可能会被优化成没有，这个比较省事
        String data = 123+"";
        assertEquals(data,"123");

        //没有装箱和拆箱操作，效率最好
        String data2 = String.valueOf(123);
        assertEquals(data2,"123");
    }
}
