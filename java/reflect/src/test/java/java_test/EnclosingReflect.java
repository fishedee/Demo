package java_test;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EnclosingReflect {

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
