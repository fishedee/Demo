package spring_test;

import org.junit.*;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by fish on 2021/5/30.
 */
//有返回值mock
public class Test1 {
    //mock控制返回值
    @Test
    public void test1(){
        Service a = mock(Service.class);
        //无参数mock
        when(a.display()).thenReturn("123");
        assertEquals(a.display(),"123");

        //含参数的mock
        when(a.display2(anyInt())).thenReturn("456");
        assertEquals(a.display2(1),"456");
    }


    //mock控制行为
    @Test
    public void test2(){
        Service b = mock(Service.class);
        when(b.display()).thenAnswer(new Answer<String>() {
            private boolean isFirst = true;

            @Override
            public String answer(InvocationOnMock var1) throws Throwable{
                if( isFirst){
                    isFirst = false;
                    return "123";
                }else{
                    return "456";
                }
            }
        });


        assertEquals(b.display(),"123");
        assertEquals(b.display(),"456");
    }

    //mock抛出异常
    @Test(expected = RuntimeException.class)
    public void test3(){
        Service c = mock(Service.class);
        when(c.display()).thenThrow(new RuntimeException());

        c.display();
    }

}
