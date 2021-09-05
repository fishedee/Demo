package java_test;

import org.junit.jupiter.api.Test;

import java.lang.reflect.*;
import java.util.HashSet;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GenericReflect2 {

    @Test
    public void test_generic_superClass()throws Exception{
        //泛型的基础类
        Class clazz = User4.class;

        //获取类的类型参数
        TypeVariable[] variable = clazz.getTypeParameters();
        assertEquals(variable.length,2);
        assertEquals(variable[0].getName(),"T1");
        assertEquals(variable[1].getName(),"T2");

        //获取字段的类型参数
        Field dataField = clazz.getField("data");
        Type genericType = dataField.getGenericType();
        assertEquals(genericType.getTypeName(),"java.util.List<T1>");

        //获取方法的类型参数
        Method goMethod = clazz.getMethod("go", Map.class);
        Type[] parameterTypes = goMethod.getGenericParameterTypes();
        Type returnType = goMethod.getGenericReturnType();
        assertEquals(parameterTypes.length,1);
        assertEquals(parameterTypes[0].getTypeName(),"java.util.Map<T1, T2>");
        assertEquals(returnType.getTypeName(),"java.util.Set<T2>");
    }

    @Test
    public void test_generic_class()throws Exception{
        //获取泛型的具体子类
        Class clazz = User5.class;

        //可以获取到父类的具体参数
        ParameterizedType  genericSuperType = (ParameterizedType)clazz.getGenericSuperclass();
        assertEquals(genericSuperType.getActualTypeArguments()[0].getTypeName(),"java.lang.Long");
        assertEquals(genericSuperType.getActualTypeArguments()[1].getTypeName(),"java.lang.String");
        assertEquals(genericSuperType.getRawType().getTypeName(),"java_test.User4");

        //依然不能获取到字段的具体参数，需要自己匹配
        Field dataField = clazz.getField("data");
        Type genericType = dataField.getGenericType();
        assertEquals(genericType.getTypeName(),"java.util.List<T1>");

        //依然不能获取到方法的具体参数，需要自己匹配
        Method goMethod = clazz.getMethod("go", Map.class);
        Type[] parameterTypes = goMethod.getGenericParameterTypes();
        Type returnType = goMethod.getGenericReturnType();
        assertEquals(parameterTypes.length,1);
        assertEquals(parameterTypes[0].getTypeName(),"java.util.Map<T1, T2>");
        assertEquals(returnType.getTypeName(),"java.util.Set<T2>");
    }

}
