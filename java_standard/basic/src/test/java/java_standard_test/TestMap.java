package java_standard_test;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class TestMap {

    @Test
    public void testMapBasic(){
        Map<Integer,String> map = new HashMap();
        map.put(1,"12");

        //Map的value是泛型，不需要做类型转换
        String data = map.get(1);
        assertEquals(data,"12");
    }

    @Test
    public void testMapGetNoGeneric(){
        Map<Integer,String> map = new HashMap();
        map.put(1,"12");

        //注意,map的Key不是泛型，它总是Object类型，接受任意的参数
        assertNull(map.get("35"));

        //map的contains操作也不是泛型，总是为Object类型
        assertFalse(map.containsKey("35"));
        assertFalse(map.containsValue(new BigDecimal("2")));
    }

    @Test
    public void testMapGet(){
        //Map的Key是ArrayList类型
        Map<ArrayList<Integer>,String> map = new HashMap();

        //我们先放入一个数据，Key为ArrayList类型的
        ArrayList<Integer> list1 = new ArrayList<>();
        list1.add(1);
        list1.add(2);
        map.put(list1,"12");

        assertEquals(map.get(list1),"12");

        //但是，由于map的get是Object类型，我们可以尝试放入一个LinkedList类型，结果数据是可以查询出来的
        //Java这样的设计，是因为不同类型也是允许equals的，所以将get接口的参数设置为Object，而不是泛型T
        LinkedList<Integer> list2 = new LinkedList<>();
        list2.add(1);
        list2.add(2);
        assertEquals(map.get(list2),"12");
    }
}
