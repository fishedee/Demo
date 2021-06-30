package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.junit.jupiter.api.Assertions.*;

//DataJpaTest的特点是：
//只加载入口类App.java，以及加载实现了CrudRepository接口的接口
//不会加载SpringMVC，入口类所在包的其他@Component类，不会加载Tomcat，所以启动速度明显更快
@DataJpaTest
@Slf4j
public class Test2{

    //这个UserService虽然有@Component注解，但是并不进行加载
    @Autowired(required = false)
    private UserService service;

    @Test
    public void go(){
        //因此这个service是空
        assertNull(service);
    }
}