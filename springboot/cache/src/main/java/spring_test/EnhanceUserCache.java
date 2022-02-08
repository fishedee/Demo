package spring_test;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@CacheConfig(cacheNames = "enhance_user")
public class EnhanceUserCache {
    private List<User> userList = new ArrayList<>();

    private int reqCacheGetNormalCount = 0;

    private int reqCacheGetKeyCount = 0;

    private int reqCacheGetCondtionCount = 0;

    private int reqCacheGetUnlessCount = 0;

    public void clearReqCount(){
        this.reqCacheGetNormalCount = 0;
        this.reqCacheGetKeyCount = 0;
        this.reqCacheGetCondtionCount = 0;
        this.reqCacheGetUnlessCount = 0;
    }

    public int getReqCacheGetNormalCount(){
        return this.reqCacheGetNormalCount;
    }

    public int getReqCacheGetKeyCount(){
        return this.reqCacheGetKeyCount;
    }

    public int getReqCacheGetCondtionCount(){
        return this.reqCacheGetCondtionCount;
    }

    public int getReqCacheGetUnlessCount(){
        return this.reqCacheGetUnlessCount;
    }

    @PostConstruct
    public void init(){
        for( int i = 0 ;i != 100;i++){
            userList.add(new User("cat_"+i,i));
        }
    }

    private User directGet(String name){
        List<User> result = userList.stream().filter((single)->{
            return single.getName().equals(name);
        }).collect(Collectors.toList());
        if( result.size() != 0 ){
            return result.get(0);
        }else{
            throw new RuntimeException("找不到User"+name);
        }
    }

    @Cacheable
    public User cacheGetNormal(String name,int nothing){
        this.reqCacheGetNormalCount++;
        return this.directGet(name);
    }

    //指定某个参数作为key
    @Cacheable(key = "#name")
    public User cacheGetKey(String name,int nothing){
        this.reqCacheGetKeyCount++;
        return this.directGet(name);
    }

    //condition是符合条件才缓存，示例用的是输入参数
    @Cacheable(condition = "#name.length() <= 5 ")
    public User cacheGetCondition(String name){
        this.reqCacheGetCondtionCount++;
        return this.directGet(name);
    }

    //unless是符合条件的不缓存，示例用的是返回值
    @Cacheable(unless = "#result.getAge() > 10")
    public User cacheGetUnless(String name){
        this.reqCacheGetUnlessCount++;
        return this.directGet(name);
    }

    @CacheEvict
    public void clear(String name){

    }

    @CacheEvict(allEntries = true)
    public void clearAll(){

    }
}
