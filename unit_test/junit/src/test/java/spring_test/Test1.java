package spring_test;

import org.junit.*;

import static org.junit.Assert.*;

/**
 * Created by fish on 2021/5/30.
 */
public class Test1 {
    @BeforeClass
    public static void a(){
        System.out.println("beforeClass");
    }


    @AfterClass
    public static void b(){
        System.out.println("afterClass");
    }


    @Before
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

    @After
    public void clean(){
        System.out.println("clean");
    }

}
