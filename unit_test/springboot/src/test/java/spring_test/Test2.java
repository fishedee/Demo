package spring_test;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.stereotype.Component;
import org.springframework.test.annotation.DirtiesContext;
import spring_test.ServiceA;
import spring_test.ServiceC;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class Test2 {
    @MockBean
    private ServiceC serviceC;

    @Autowired
    private ServiceA serviceA;

    @Test
    public void test1(){
        when(serviceC.get()).thenReturn("KK");
        assertEquals(serviceA.get(),"ABKK");
    }
}
