package spring_test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by fish on 2021/5/31.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class Test4 {
    @Mock
    private Service service;

    @InjectMocks
    private Controller controller;

    @Test
    public void test1(){
        when(service.display()).thenReturn("789");

        assertEquals(controller.getDisplay(),"789");
    }
}
