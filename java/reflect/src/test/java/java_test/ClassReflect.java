package java_test;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

public class ClassReflect {

    public Class getClass1(){
        return User.class;
    }

    @Test
    public void test(){
        Class clazz = getClass1();
        //基础信息
        assertEquals("java_test.User",clazz.getName());
        assertEquals("User",clazz.getSimpleName());
        assertEquals("java_test",clazz.getPackage().getName());

        //访问信息
        assertTrue(Modifier.isPublic(clazz.getModifiers()));

        //继承树的信息
        assertEquals(Person.class,clazz.getSuperclass());
        assertTrue(Object.class.isAssignableFrom(clazz));//注意子类是写在括号里面的
        assertTrue(Person.class.isAssignableFrom(clazz));
        assertFalse(Animal.class.isAssignableFrom(clazz));

        //接口信息
        assertEquals(1,clazz.getInterfaces().length);
        assertEquals(Walker.class,clazz.getInterfaces()[0]);
        assertTrue(Walker.class.isAssignableFrom(clazz));//接口也可以用isAssignableFrom
        assertFalse(Flyer.class.isAssignableFrom(clazz));

        //其他信息
        assertFalse(clazz.isEnum());//是否为枚举类型
    }

    @Test
    public void test2(){
        Class clazz = User.Address.class;

        //访问信息
        assertTrue(Modifier.isPublic(clazz.getModifiers()));
        assertTrue(Modifier.isStatic(clazz.getModifiers()));

        //是否为内部类
        assertTrue(clazz.isMemberClass());

        //非本地类，不需要外层类的this指针
        assertFalse(clazz.isLocalClass());

        //获取外部层的类
        assertEquals(User.class,clazz.getEnclosingClass());
    }

    @Test
    public void test3(){
        Class clazz = User.Contact.class;

        //访问信息
        assertTrue(Modifier.isProtected(clazz.getModifiers()));
        assertFalse(Modifier.isStatic(clazz.getModifiers()));

        //是否为内部类
        assertTrue(clazz.isMemberClass());

        //本地类，需要外部类的this指针
        assertFalse(clazz.isLocalClass());

        //获取外部层的类
        assertEquals(User.class,clazz.getEnclosingClass());
    }
}
