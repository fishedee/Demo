package spring_test;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by fish on 2021/5/30.
 */
public class Test3 {

    @Test
    public void test3(){
        RuntimeException exception = assertThrows(RuntimeException.class,()->{
            throw new RuntimeException("123");
        });

        assertEquals(exception.getMessage(),"123");
    }
}
