package java_standard_test;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TestLong {

    @Test
    public void test1(){
        //两个box类型，不能用指针比较，必须要用equals比较
        Long a = new Long(11L);
        Long b = 11L;
        assertFalse(a == b );
        assertTrue(a.equals(b));
    }

    @Test
    public void test2(){
        //box类型，无论是用字面值，还是类型，都需要类型相同才是为true
        //一个是Long类型，另外一个是Integer类型，用equals肯定为false的
        Long a = 11L;
        assertFalse(a.equals(11));

        Integer b = 11;
        assertFalse(a.equals(b));

        //这个是显然错误的，但是因为equals的参数是Object类型，所以编译器不会报错
        assertFalse(a.equals(true));
    }

    @Test
    public void test3(){
        //更好的办法是用longValue转换为基础类型，再去比较，这样能适应不同类型的比较
        Long a = 11L;
        assertTrue(a.longValue()==11);

        Integer b = 11;
        assertTrue(a.longValue()==b);

        //转换为基础类型以后，这段话会在编译时报错
        //assertTrue(a.longValue()==true);

        //当Box类型为null的时候，转换为基础类型，会抛出NullPointerException，这个符合预期
        assertThrows(NullPointerException.class,()->{
            Long c = null;
            assertTrue(c.longValue()==3);
        });
    }
}
