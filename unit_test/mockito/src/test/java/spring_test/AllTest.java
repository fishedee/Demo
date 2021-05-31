package spring_test;

import junit.framework.TestSuite;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * Created by fish on 2021/5/31.
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        Test1.class,
        Test2.class,
        Test3.class,
        Test4.class,
})
public class AllTest {
}
