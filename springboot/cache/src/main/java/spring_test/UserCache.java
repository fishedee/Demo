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
@CacheConfig(cacheNames = "user")
public class UserCache {

    private List<User> userList = new ArrayList<>();

    private int reqCacheGetCount = 0;

    private int reqDbGetCount = 0;

    public void clearReqCount(){
        this.reqCacheGetCount = 0;
        this.reqDbGetCount = 0;
    }

    public int getReqCacheGetCount(){
        return this.reqCacheGetCount;
    }

    public int getReqDbGetCount(){
        return this.reqDbGetCount;
    }

    @PostConstruct
    public void init(){
        for( int i = 0 ;i != 100;i++){
            userList.add(new User("fish_"+i,i));
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
    public User cacheGet(String name){
        this.reqCacheGetCount++;
        return this.directGet(name);
    }

    @CachePut
    public User dbGet(String name){
        this.reqDbGetCount++;
        return this.directGet(name);
    }

    @CacheEvict
    public void clear(String name){

    }

    @CacheEvict(allEntries = true)
    public void clearAll(){

    }
}
