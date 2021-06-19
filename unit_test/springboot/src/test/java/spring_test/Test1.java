package spring_test;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import spring_test.ServiceA;
import spring_test.ServiceB;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

/**
 * Created by fish on 2021/5/30.
 */
@SpringBootTest
public class Test1 {
    @MockBean
    private ServiceB serviceB;

    @Autowired
    private ServiceA serviceA;

    @Test
    public void test1(){
        when(serviceB.get()).thenReturn("MM");
        assertEquals(serviceA.get(),"AMM");
    }

}
