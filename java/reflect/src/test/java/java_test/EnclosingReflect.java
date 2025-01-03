package java_test;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EnclosingReflect {

    @Test
    public void isMemberClass(){
        User2 user = new User2();
        user.getData();

        assertEquals(false,User2.class.isMemberClass());
        assertEquals(false,user.a.getClass().isMemberClass());//在块里面定义的类
        assertEquals(false,user.b.getClass().isMemberClass());//在块里面定义的类
        assertEquals(true,user.c.getClass().isMemberClass());//在类定义的
    }

    @Test
    public void isLocalClass(){
        User2 user = new User2();
        user.getData();

        assertEquals(false,User2.class.isLocalClass());
        assertEquals(true,user.a.getClass().isLocalClass());//在块里面定义的类
        assertEquals(true,user.b.getClass().isLocalClass());//在块里面定义的类
        assertEquals(false,user.c.getClass().isLocalClass());//在类定义的
    }

    @Test
    public void testEnclosingClass(){
        User2 user = new User2();
        user.getData();

        assertEquals(User2.class,user.a.getClass().getEnclosingClass());
        assertEquals(User2.class,user.b.getClass().getEnclosingClass());
        assertEquals(User2.class,user.c.getClass().getEnclosingClass());
    }

    @Test
    public void testEnclosingMethod() throws Exception{
        User2 user = new User2();
        user.getData();

        assertEquals(User2.class.getDeclaredMethod("getData"),user.a.getClass().getEnclosingMethod());
        assertEquals(null,user.b.getClass().getEnclosingMethod());
        assertEquals(null,user.c.getClass().getEnclosingMethod());
    }

    @Test
    public void testEnclosingConstructor() throws Exception{
        User2 user = new User2();
        user.getData();

        assertEquals(null,user.a.getClass().getEnclosingConstructor());
        assertEquals(User2.class.getDeclaredConstructor(),user.b.getClass().getEnclosingConstructor());
        assertEquals(null,user.c.getClass().getEnclosingConstructor());
    }
}
