package spring_test;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by fish on 2021/5/30.
 */
public class Test1 {
    @BeforeAll
    public static void a(){
        System.out.println("beforeClass");
    }


    @AfterAll
    public static void b(){
        System.out.println("afterClass");
    }


    @BeforeEach
    public void setUp(){
        System.out.println("setUp");
    }

    @Test
    public void test1(){
        System.out.println("test1 ref = "+this.toString());
        assertEquals(1,1);
    }

    @Test
    public void test2(){
        System.out.println("test2 ref = "+this.toString());
        assertEquals(2,2);
    }

    @AfterEach
    public void clean(){
        System.out.println("clean");
    }

}
