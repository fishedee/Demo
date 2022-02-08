package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableCaching
@Slf4j
public class App implements ApplicationRunner
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private ConcurrentMapCacheManager concurrentMapCacheManager;

    @PostConstruct
    public void init(){
        //设置按值存储，但需要对象实现Serializable接口
        //concurrentMapCacheManager.setStoreByValue(true);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception{
        //默认情况下，使用ConcurrentMapCacheManager，没有过期时间，也没有最大数量
        log.info("{}",cacheManager.getClass().getName());
    }
}
