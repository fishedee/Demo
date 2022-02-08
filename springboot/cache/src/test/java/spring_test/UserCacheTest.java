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
public class UserCacheTest {

    @Autowired
    private UserCache userCache;

    @BeforeEach
    public void setUp(){
        userCache.clearAll();
        userCache.clearReqCount();
    }

    private void testGetSampleZero(int count){
        User a = userCache.cacheGet("fish_0");
        assertEquals(a.getAge(),0);

        User b = userCache.cacheGet("fish_0");
        assertEquals(b.getAge(),0);

        User c = userCache.cacheGet("fish_0");
        assertEquals(c.getAge(),0);

        assertEquals(userCache.getReqCacheGetCount(),count);
    }

    private void testGetSampleOne(int count){
        User a = userCache.cacheGet("fish_1");
        assertEquals(a.getAge(),1);

        User b = userCache.cacheGet("fish_1");
        assertEquals(b.getAge(),1);

        User c = userCache.cacheGet("fish_1");
        assertEquals(c.getAge(),1);

        assertEquals(userCache.getReqCacheGetCount(),count);
    }

    @Test
    public void testBasic(){
        //初始
        this.testGetSampleZero(1);
        this.testGetSampleOne(2);

        //全部清理
        userCache.clearAll();
        this.testGetSampleZero(3);
        this.testGetSampleOne(4);

        //清理单个key
        userCache.clear("fish_0");
        this.testGetSampleZero(5);
        this.testGetSampleOne(5);

        //清理单个key
        userCache.clear("fish_1");
        this.testGetSampleZero(5);
        this.testGetSampleOne(6);
    }

    @Test
    public void testBasic2(){
        //CachePut总是会执行的，他产生一个副作用是自动放入到cache里面
        userCache.dbGet("fish_0");
        userCache.dbGet("fish_0");
        assertEquals(userCache.getReqDbGetCount(),2);

        //这个时候，使用cacheGet会自动从cache里面拿，不需要实际调用
        User a = userCache.cacheGet("fish_0");
        assertEquals(a.getAge(),0);
    }

    @Test
    public void testCacheSerialize(){
        //默认情况下，对本地的cache使用按照引用缓存的方式，所以会触发修改
        User a = userCache.cacheGet("fish_2");
        assertEquals(a.getAge(),2);
        a.setAge(102);

        User b = userCache.cacheGet("fish_2");
        assertEquals(b.getAge(),102);
    }

    @Test
    public void testThrow(){
        //当抛出异常的时候，异常不会放入缓存
        for( int i = 0 ;i != 2;i++){
            try{
                User a = userCache.cacheGet("fish_1000");
            }catch(Exception e){
            }
        }
        assertEquals(userCache.getReqCacheGetCount(),2);
    }
}
