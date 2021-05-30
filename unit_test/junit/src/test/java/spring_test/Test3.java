package spring_test;

import org.junit.Test;

/**
 * Created by fish on 2021/5/30.
 */
public class Test3 {

    @Test(expected = RuntimeException.class)
    public void test3(){
        throw new RuntimeException("123");
    }
}
