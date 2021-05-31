package spring_test;

import org.junit.Test;
import org.mockito.ArgumentCaptor;

import java.util.Arrays;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by fish on 2021/5/31.
 */
//捕获参数检查
public class Test3 {

    //逐次检查参数
    @Test
    public void test1(){
        Service a = mock(Service.class);


        a.display2(1);
        verify(a).display2(1);


        a.display2(2);
        verify(a).display2(1);
    }

    //逐次检查调用次数
    @Test
    public void test2(){
        Service b = mock(Service.class);

        b.nothing();
        b.nothing();

        verify(b,times(2)).nothing();
    }

    //使用参数捕获器,检查参数
    @Test
    public void test3(){
        Service a = mock(Service.class);

        a.display2(12);
        a.display2(23);

        ArgumentCaptor<Integer> argument = ArgumentCaptor.forClass(Integer.class);
        verify(a,times(2)).display2(argument.capture());

        assertEquals(
                Arrays.asList(12,23),
                argument.getAllValues()
        );
    }
}
