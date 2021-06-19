package spring_test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.context.annotation.Import;
import spring_test.util.MyConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class Test4 {

    @SpyBean
    private ServiceC serviceC;

    @Test
    public void test1(){
        when(serviceC.get2()).thenReturn("UK");

        assertEquals(serviceC.get(),"HelloC");
        assertEquals(serviceC.get2(),"UK");
    }
}
