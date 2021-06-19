package spring_test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import spring_test.ServiceA;
import spring_test.util.MyConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
@Import(MyConfig.class)
public class Test3 {

    @Autowired
    private MyConfig.MyServiceC myServiceC;

    @Autowired
    private ServiceA serviceA;

    @Test
    public void test1(){
        myServiceC.set("--MM--");
        assertEquals(serviceA.get(),"AB--MM--");
    }
}
