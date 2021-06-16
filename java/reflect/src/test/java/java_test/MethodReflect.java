package java_test;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

public class MethodReflect {

    @Test
    public void test_methods(){
        Class clazz = User.class;

        //getMethods只能获取到public的method，包括static的method
        //包括父类的方法
        Method[] methods = clazz.getMethods();
        List<String> methodsName = Arrays.stream(methods).map((a)->{
            return a.getName();
        }).sorted().collect(Collectors.toList());//注意获取的顺序不是固定的，需要排序一下

        assertIterableEquals(Arrays.asList("equals","getClass","getName","hashCode","notify","notifyAll","say","setName","setPrefix","toString","wait","wait","wait","walk"),methodsName);

        //getgetDeclaredMethods能获取到public,private,protect,package的所有method，包括static的method
        //不包括父类的字段
        Method[] methods2 = clazz.getDeclaredMethods();
        List<String> methodsName2 = Arrays.stream(methods2).map((a)->{
            return a.getName();
        }).sorted().collect(Collectors.toList());

        assertIterableEquals(Arrays.asList("getName","setAddress","setName","setNameInner","setPrefix","walk"),methodsName2);
    }

    @Test
    public void test_single_method()throws Exception{
        Class clazz = User.class;
        //可能抛出java.lang.NoSuchMethodException,SecurityException
        //查询的时候注意带上参数,java的方法是支持同名不同参数的
        Method setNameMethod = clazz.getDeclaredMethod("setName",String.class);

        //基础信息
        assertEquals(setNameMethod.getName(),"setName");

        //访问信息
        assertTrue(Modifier.isPublic(setNameMethod.getModifiers()));
        assertFalse(Modifier.isStatic(setNameMethod.getModifiers()));

        //外部类信息
        assertEquals(clazz,setNameMethod.getDeclaringClass());

        //参数信息
        assertEquals(setNameMethod.getParameterCount(),1);
        assertEquals(setNameMethod.getParameterTypes()[0],String.class);
        assertEquals(setNameMethod.getParameters()[0].getName(),"name");//方法的名称

        //返回值信息，注意void也是有class的
        assertEquals(setNameMethod.getReturnType(),void.class);
    }

    @Test
    public void test_method_invoke() throws Exception{
        User user = new User();

        Class clazz = User.class;
        Method setNameMethod = clazz.getDeclaredMethod("setName",String.class);

        //调用反射方法
        setNameMethod.invoke(user,"MK");

        //反射获取，基础类型用getInt等方法
        assertEquals(user.getName(),"MM_MK");
    }

    @Test
    public void test_method_invoke_static() throws Exception{
        User user = new User();

        Class clazz = User.class;
        Method setPrefixMethod = clazz.getDeclaredMethod("setPrefix");

        //对于static的method，第一个参数传递null
        setPrefixMethod.invoke(null);
    }
}
