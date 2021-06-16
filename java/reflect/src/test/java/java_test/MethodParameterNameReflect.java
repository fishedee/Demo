package java_test;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.core.DefaultParameterNameDiscoverer;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class MethodParameterNameReflect {

    DefaultParameterNameDiscoverer parameterNameDiscoverer = new DefaultParameterNameDiscoverer();

    //JDK 8 以下只能用字节码获取
    @Test
    public void test1()throws Exception{
        Class clazz = User3.class;
        Method loginMethod = clazz.getDeclaredMethod("login",String.class,String.class);
        String[] parameterName =  parameterNameDiscoverer.getParameterNames(loginMethod);

        assertArrayEquals(new String[]{"name","password"},parameterName);
    }

    //JDK 8 以上都可以用这个方法
    @Test
    public void test2()throws Exception{
        Class clazz = User3.class;
        Method loginMethod = clazz.getDeclaredMethod("login",String.class,String.class);
        List<String> parameterName =  Arrays.stream(loginMethod.getParameters()).map((a)->{
            return a.getName();
        }).collect(Collectors.toList());

        assertIterableEquals(Arrays.asList("name","password"),parameterName);
    }
}
