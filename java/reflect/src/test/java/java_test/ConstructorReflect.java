package java_test;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConstructorReflect {

    @Test
    public void test_constructor(){
        Class clazz = User.class;

        //getConstructors只能获取到public的Constructor
        //构造器没有父类的说法
        Constructor[] constructors = clazz.getConstructors();
        List<String> constructorName = Arrays.stream(constructors).map((a)->{
            return a.getName();
        }).sorted().collect(Collectors.toList());//注意获取的顺序不是固定的，需要排序一下

        assertIterableEquals(Arrays.asList("java_test.User"),constructorName);

        //getDeclaredConstructors可以获取到public,private和protected，package的所有Constructor
        //构造器没有父类的说法
        Constructor[] constructors2 = clazz.getDeclaredConstructors();
        List<String> constructorName2 = Arrays.stream(constructors2).map((a)->{
            return a.getName();
        }).sorted().collect(Collectors.toList());//注意获取的顺序不是固定的，需要排序一下

        assertIterableEquals(Arrays.asList("java_test.User","java_test.User"),constructorName2);
    }

    @Test
    public void test_single_constructor()throws Exception{
        Class clazz = User.class;
        //可能抛出java.lang.NoSuchMethodException,SecurityException
        //根据不同参数来选择构造器
        Constructor stringConstructor = clazz.getDeclaredConstructor(String.class);

        //基础信息
        assertEquals(stringConstructor.getName(),"java_test.User");

        //访问信息
        assertTrue(Modifier.isProtected(stringConstructor.getModifiers()));
        assertFalse(Modifier.isStatic(stringConstructor.getModifiers()));

        //外部类信息
        assertEquals(clazz,stringConstructor.getDeclaringClass());

        //参数信息
        assertEquals(stringConstructor.getParameterCount(),1);
        assertEquals(stringConstructor.getParameterTypes()[0],String.class);
    }

    @Test
    public void test_constructor_invoke()throws Exception{
        Class clazz = User.class;
        //可能抛出java.lang.NoSuchMethodException,SecurityException
        //根据不同参数来选择构造器
        Constructor stringConstructor = clazz.getDeclaredConstructor(String.class);

        Object target = stringConstructor.newInstance("Fish");
        assertEquals(((User)target).getName(),"Fish");
    }

}
