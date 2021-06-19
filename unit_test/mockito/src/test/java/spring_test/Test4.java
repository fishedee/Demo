package spring_test;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by fish on 2021/5/31.
 */
public class Test4 {
    @Mock
    private Service service;

    @InjectMocks
    private Controller controller;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void test1(){
        when(service.display()).thenReturn("789");

        assertEquals(controller.getDisplay(),"789");
    }
}
