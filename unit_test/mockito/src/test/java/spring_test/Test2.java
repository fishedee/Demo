package spring_test;

import org.junit.Test;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by fish on 2021/5/31.
 */
//无返回值mock
public class Test2 {

    //mock,啥事不做
    @Test
    public void test1(){
        Service a = mock(Service.class);
        doNothing().when(a).nothing();

        a.nothing();
    }

    //mock,抛出异常
    @Test(expected = RuntimeException.class)
    public void test2(){
        Service a = mock(Service.class);
        doThrow(new RuntimeException()).when(a).nothing2(anyInt());

        a.nothing2(1);
    }
}
