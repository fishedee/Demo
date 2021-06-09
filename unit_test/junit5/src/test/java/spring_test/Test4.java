package spring_test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.naming.ldap.Control;

import static org.junit.jupiter.api.Assertions.*;
/**
 * Created by fish on 2021/5/30.
 */
@SpringBootTest
public class Test4 {

    @Autowired
    private Controller controller;

    @Test
    public void test(){
        assertEquals(controller.getDisplay(),"mm");
    }
}
