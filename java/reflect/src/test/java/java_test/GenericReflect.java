package java_test;

import org.junit.jupiter.api.MethodDescriptor;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.*;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

public class GenericReflect {

    @Test
    public void test_generic_superClass(){
        Class clazz = User3.class;

        Type type = clazz.getGenericSuperclass();

        //泛型的时候可以做这个类型转换
        ParameterizedType parameterizedType = (ParameterizedType) type;

        //获取泛型的内容参数
        Class containerType = (Class)parameterizedType.getRawType();
        Class argumentType = (Class)parameterizedType.getActualTypeArguments()[0];

        assertEquals(containerType, HashSet.class);
        assertEquals(argumentType,String.class);
    }

    @Test
    public void test_generic_field()throws Exception{
        Class clazz = User3.class;

        Type type = clazz.getDeclaredField("datas").getGenericType();

        //泛型的时候可以做这个类型转换
        ParameterizedType parameterizedType = (ParameterizedType) type;

        //获取泛型的内容参数
        Class containerType = (Class)parameterizedType.getRawType();
        Class argumentType = (Class)parameterizedType.getActualTypeArguments()[0];

        assertEquals(containerType, List.class);
        assertEquals(argumentType,Integer.class);
    }

    @Test
    public void test_generic_method()throws Exception{
        Class clazz = User3.class;

        //拿泛型方法的时候，直接用基础类，List<>就用List.class，T就用Object.class
        Method method = clazz.getDeclaredMethod("add",List.class,Object.class);

        Type[] parameterizedType = (Type[]) method.getGenericParameterTypes();
        ParameterizedType firstParameter = (ParameterizedType) parameterizedType[0];

        //获取泛型的内容参数
        Class containerType = (Class)firstParameter.getRawType();
        TypeVariable argumentType = (TypeVariable)firstParameter.getActualTypeArguments()[0];

        assertEquals(containerType, List.class);
        //参数是一个泛型变量代指
        assertEquals(argumentType.getName(),"T");
    }

    @Test
    public void test_method_with_generic_parameter()throws Exception{
        Class clazz = User3.class;

        //拿泛型方法的时候，直接用基础类，List<>就用List.class，T就用Object.class
        Method method = clazz.getDeclaredMethod("go", LinkedList.class);

        Type[] parameterizedType = (Type[]) method.getGenericParameterTypes();
        ParameterizedType firstParameter = (ParameterizedType) parameterizedType[0];

        //获取泛型的内容参数
        Class containerType = (Class)firstParameter.getRawType();
        Class argumentType = (Class)firstParameter.getActualTypeArguments()[0];

        assertEquals(containerType, LinkedList.class);
        //参数是一个泛型变量代指
        assertEquals(argumentType,Integer.class);
    }

    /*
    //以下这种做法是不行的，你不能在运行时创建一个未知类型的泛型
    @Test
    public void test_generic_constructor_invoke()throws Exception{
        Class clazz = Class.forName("java.util.ArrayList<String>");
        Object target = clazz.newInstance();
        List<String> result = (List<String>)target;

        result.add("!23");
        result.add("mm");
        System.out.println(result);
    }
     */

    @Test
    public void invoke_method_with_generic_parameter()throws Exception{
        Class clazz = User3.class;

        //拿泛型方法的时候，直接用基础类，List<>就用List.class，T就用Object.class
        Method method = clazz.getDeclaredMethod("go", LinkedList.class);

        //go是一个泛型方法，它接受的的是LinkedList<Integer>类型
        Class<?>[] clazzes = method.getParameterTypes();
        Object argument = clazzes[0].newInstance();

        //但我们可以强行转换为LinkedList<String>写入数据
        LinkedList<String> listString = (LinkedList<String>) argument;
        listString.add("ccg");
        System.out.println(listString);

        //并且传递进入go方法都是没问题的
        method.invoke(new User3(),argument);

        //因为Java的泛型仅仅是编译时的检查，在运行时所有元素都是以Object的类型运行，类型在运行时被擦除了，不会被JRE检查
    }
}
