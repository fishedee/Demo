package java_test;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

public class FieldReflect {

    public Class getClass2(){
        try{
            return Class.forName("java_test.User");
        }catch(ClassNotFoundException e){
            throw new RuntimeException(e);
        }
    }

    @Test
    public void test_fields(){
        Class clazz = getClass2();

        //getFields只能获取到public的field，包括static的field
        //包括父类的字段
        Field[] fields =  clazz.getFields();
        List<String> fieldsName = Arrays.asList(fields).stream().map((a)->{
            return a.getName();
        }).collect(Collectors.toList());

        assertIterableEquals(Arrays.asList("name","log","saySomething"),fieldsName);

        //getDeclareFields能获取到public,private,protect,package的所有field，包括static的field
        //不包括父类的字段
        Field[] declaredFields =  clazz.getDeclaredFields();
        List<String> declareFieldsName = Arrays.asList(declaredFields).stream().map((a)->{
            return a.getName();
        }).collect(Collectors.toList());

        assertIterableEquals(Arrays.asList("id","name","address","contact","log"),declareFieldsName);
    }

    @Test
    public void test_single_field()throws Exception{
        Class clazz = getClass2();
        //可能抛出java.lang.NoSuchFieldException
        Field idField = clazz.getDeclaredField("id");

        //基础信息
        assertEquals(idField.getName(),"id");

        //类型信息
        assertEquals(idField.getType(),int.class);

        //是否为系统添加的字段，例如this
        assertFalse(idField.isSynthetic());

        //访问信息
        assertTrue(Modifier.isPrivate(idField.getModifiers()));
        assertFalse(Modifier.isStatic(idField.getModifiers()));

        //外部类信息
        assertEquals(clazz,idField.getDeclaringClass());
    }

    @Test
    public void test_field_set_and_get() throws Exception{
        User user = new User();

        Class clazz = getClass2();
        Field nameField = clazz.getField("name");

        //反射设置，基础类型用setInt等方法
        nameField.set(user,"MK");
        assertEquals(user.getName(),"MK");

        //反射获取，基础类型用getInt等方法
        assertEquals(nameField.get(user),"MK");
    }

    @Test
    public void test_field_set_and_get_static() throws Exception{
        User user = new User();

        Class clazz = getClass2();
        Field logField = clazz.getDeclaredField("log");

        //对于static的field，第一个参数传递null
        Logger logger = Logger.getAnonymousLogger();
        logField.set(null, logger);
        assertEquals(logger,logField.get(null));
    }
}
