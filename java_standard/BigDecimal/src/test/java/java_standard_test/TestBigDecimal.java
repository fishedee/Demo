package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
public class TestBigDecimal {

    @Test
    public void testBaisc(){
        BigDecimal a = new BigDecimal("11");
        BigDecimal b = new BigDecimal("1.2");

        assertEquals(a.add(b),new BigDecimal("12.2"));
        assertEquals(a.subtract(b),new BigDecimal("9.8"));
        assertEquals(a.multiply(b),new BigDecimal("13.2"));

        //能够整除的时候才能使用直接的divide，否则会报出ArithmeticException异常
        assertThrows(ArithmeticException.class,()->{
            assertEquals(a.divide(b),new BigDecimal("12.31"));
        });

        //直接使用divide模式的时候，结果的scale（小数位数），与a的scale（小数位数）相同，也就是不确定的，我们需要尽量避免这种写法
        assertEquals(a.divide(b, BigDecimal.ROUND_HALF_UP),new BigDecimal("9"));

        //使用divide，指定scale（小数位数），明确的指定，我们尽量使用这种写法
        assertEquals(a.divide(b,4,BigDecimal.ROUND_HALF_UP),new BigDecimal("9.1667"));
    }

    @Test
    public void testEquals(){
        BigDecimal a = new BigDecimal("11");
        BigDecimal b = new BigDecimal("11.0");

        //直接使用equals比较的时候，会比较scale部分，所以结果为false。这种写法我们需要尽量避免
        assertFalse(a.equals(b));

        //使用compareTo，才能在避免scale不同的时候，只进行value部分的比较
        assertEquals(a.compareTo(b),0);
    }

    @Test
    public void testAbs(){
        assertEquals(new BigDecimal("11").abs(),new BigDecimal("11"));
        assertEquals(new BigDecimal("-11").abs(),new BigDecimal("11"));
    }

    @Test
    public void testFormat(){
        BigDecimal veryBigNumber = new BigDecimal("1.23e14");
        BigDecimal normal = new BigDecimal("11");
        BigDecimal backNumber = new BigDecimal("12.200");

        //普通的整数
        assertEquals(veryBigNumber.toString(),"1.23E+14");
        assertEquals(normal.toString(),"11");
        assertEquals(backNumber.toString(),"12.200");

        //plainString，避免科学计数法
        assertEquals(veryBigNumber.toPlainString(),"123000000000000");
        assertEquals(normal.toPlainString(),"11");
        assertEquals(backNumber.toPlainString(),"12.200");

        //stripTrailingZeros + plainString，先去掉尾部0，再加上避免科学计数法
        assertEquals(veryBigNumber.stripTrailingZeros().toPlainString(),"123000000000000");
        assertEquals(normal.stripTrailingZeros().toPlainString(),"11");
        assertEquals(backNumber.stripTrailingZeros().toPlainString(),"12.2");
    }

    @Test
    public void testRound(){
        BigDecimal a = new BigDecimal("2.12");
        BigDecimal a_2 = new BigDecimal("2.15");
        BigDecimal b = new BigDecimal("-2.12");
        BigDecimal b_2 = new BigDecimal("-2.15");

        //对于，正数，且不在中间线
        assertEquals(a.setScale(1,BigDecimal.ROUND_CEILING).toPlainString(),"2.2");
        assertEquals(a.setScale(1,BigDecimal.ROUND_FLOOR).toPlainString(),"2.1");
        assertEquals(a.setScale(1,BigDecimal.ROUND_DOWN).toPlainString(),"2.1");
        assertEquals(a.setScale(1,BigDecimal.ROUND_UP).toPlainString(),"2.2");
        assertEquals(a.setScale(1,BigDecimal.ROUND_HALF_UP).toPlainString(),"2.1");
        assertEquals(a.setScale(1,BigDecimal.ROUND_HALF_DOWN).toPlainString(),"2.1");

        //对于，正数，且在中间线
        assertEquals(a_2.setScale(1,BigDecimal.ROUND_CEILING).toPlainString(),"2.2");
        assertEquals(a_2.setScale(1,BigDecimal.ROUND_FLOOR).toPlainString(),"2.1");
        assertEquals(a_2.setScale(1,BigDecimal.ROUND_DOWN).toPlainString(),"2.1");
        assertEquals(a_2.setScale(1,BigDecimal.ROUND_UP).toPlainString(),"2.2");
        assertEquals(a_2.setScale(1,BigDecimal.ROUND_HALF_UP).toPlainString(),"2.2");
        assertEquals(a_2.setScale(1,BigDecimal.ROUND_HALF_DOWN).toPlainString(),"2.1");

        //对于，负数，且不在中间线
        assertEquals(b.setScale(1,BigDecimal.ROUND_CEILING).toPlainString(),"-2.1");
        assertEquals(b.setScale(1,BigDecimal.ROUND_FLOOR).toPlainString(),"-2.2");
        assertEquals(b.setScale(1,BigDecimal.ROUND_DOWN).toPlainString(),"-2.1");
        assertEquals(b.setScale(1,BigDecimal.ROUND_UP).toPlainString(),"-2.2");
        assertEquals(b.setScale(1,BigDecimal.ROUND_HALF_UP).toPlainString(),"-2.1");
        assertEquals(b.setScale(1,BigDecimal.ROUND_HALF_DOWN).toPlainString(),"-2.1");

        //对于，负数，且在中间线
        assertEquals(b_2.setScale(1,BigDecimal.ROUND_CEILING).toPlainString(),"-2.1");
        assertEquals(b_2.setScale(1,BigDecimal.ROUND_FLOOR).toPlainString(),"-2.2");
        assertEquals(b_2.setScale(1,BigDecimal.ROUND_DOWN).toPlainString(),"-2.1");
        assertEquals(b_2.setScale(1,BigDecimal.ROUND_UP).toPlainString(),"-2.2");
        assertEquals(b_2.setScale(1,BigDecimal.ROUND_HALF_UP).toPlainString(),"-2.2");
        assertEquals(b_2.setScale(1,BigDecimal.ROUND_HALF_DOWN).toPlainString(),"-2.1");

        //总结如下：
        //ROUND_CEILING和ROUND_FLOOR是考虑符号的进位，ROUND_CEILING总是偏大，ROUND_FLOOR总是偏小。
        //ROUND_UP和ROUND_DOWN是不考虑符号的进位，ROUND_UP总是偏大，ROUND_DOWN总是偏小。
        //ROUND_HALF_UP和ROUND_HALF_DOWN是不考虑符号的进位，ROUND_HALF_UP遇到5进位，ROUND_HALF_DOWN遇到5退位。
    }


    @Test
    public void testToInteger() {
        BigDecimal a = new BigDecimal("1.2");

        //在没有Round的情况下，直接转换为intValueExtract会报错
        assertThrows(ArithmeticException.class,()->{
            assertEquals(a.intValueExact(),1);
        });
        assertEquals(a.setScale(0,BigDecimal.ROUND_FLOOR).intValueExact(),1);

        //intValue就没有那么严谨了，没有round的时候也能转换到int，我们尽量避免这样做
        assertEquals(a.intValue(),1);
    }
}
