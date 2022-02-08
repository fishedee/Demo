package spring_test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.core.AutoConfigureCache;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Component;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class EnhanceCacheTest {

    @Autowired
    private EnhanceUserCache userCache;

    @BeforeEach
    public void setUp(){
        userCache.clearAll();
        userCache.clearReqCount();
    }

    @Test
    public void testNormal(){
        //默认情况下，以所有的参数组合作为key
        User a = userCache.cacheGetNormal("cat_1",1);
        assertEquals(a.getAge(),1);

        User b = userCache.cacheGetNormal("cat_1",2);
        assertEquals(b.getAge(),1);

        User c = userCache.cacheGetNormal("cat_1",3);
        assertEquals(c.getAge(),1);

        assertEquals(userCache.getReqCacheGetNormalCount(),3);
    }

    @Test
    public void testKey(){
        //使用key参数可以覆盖这个设定，指定cache的key
        User a = userCache.cacheGetKey("cat_1",1);
        assertEquals(a.getAge(),1);

        User b = userCache.cacheGetKey("cat_1",2);
        assertEquals(b.getAge(),1);

        User c = userCache.cacheGetKey("cat_1",3);
        assertEquals(c.getAge(),1);

        assertEquals(userCache.getReqCacheGetKeyCount(),1);
    }

    @Test
    public void testCondition(){
        //condition参数可以指定输入参数cache的条件。
        User a = userCache.cacheGetCondition("cat_1");
        assertEquals(a.getAge(),1);

        User b = userCache.cacheGetCondition("cat_1");
        assertEquals(b.getAge(),1);

        User c = userCache.cacheGetCondition("cat_1");
        assertEquals(c.getAge(),1);

        assertEquals(userCache.getReqCacheGetCondtionCount(),1);

        User a2 = userCache.cacheGetCondition("cat_12");
        assertEquals(a2.getAge(),12);

        User b2 = userCache.cacheGetCondition("cat_12");
        assertEquals(b2.getAge(),12);

        User c2 = userCache.cacheGetCondition("cat_12");
        assertEquals(c2.getAge(),12);

        assertEquals(userCache.getReqCacheGetCondtionCount(),4);
    }

    @Test
    public void testUnless(){
        //condition参数可以指定输入参数cache的条件。
        User a = userCache.cacheGetUnless("cat_1");
        assertEquals(a.getAge(),1);

        User b = userCache.cacheGetUnless("cat_1");
        assertEquals(b.getAge(),1);

        User c = userCache.cacheGetUnless("cat_1");
        assertEquals(c.getAge(),1);

        assertEquals(userCache.getReqCacheGetUnlessCount(),1);

        User a2 = userCache.cacheGetUnless("cat_12");
        assertEquals(a2.getAge(),12);

        User b2 = userCache.cacheGetUnless("cat_12");
        assertEquals(b2.getAge(),12);

        User c2 = userCache.cacheGetUnless("cat_12");
        assertEquals(c2.getAge(),12);

        assertEquals(userCache.getReqCacheGetUnlessCount(),4);
    }
}
