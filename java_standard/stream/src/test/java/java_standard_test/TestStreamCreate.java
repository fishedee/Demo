package java_standard_test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;

public class TestStreamCreate {
    @Test
    public void testCollect(){
        List<Integer> lists = Arrays.asList(1,2,3);
        List<Integer> lists2 = lists.stream().map((a)->{
            return a+1;
        }).collect(Collectors.toList());
        assertIterableEquals(lists2,Arrays.asList(2,3,4));
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testIterable(){
        Iterable<Integer> iterables = Arrays.asList(1,2,3);

        //第二个参数代表不并行
        List<Integer> lists = StreamSupport.stream(iterables.spliterator(),false).map((a)->{
            return a+1;
        }).collect(Collectors.toList());
        assertIterableEquals(lists,Arrays.asList(2,3,4));
    }

    @Test
    public void testObjectArray(){
        Integer[] intArray = new Integer[]{1,2,3};

        //用Arrays.stream来转换为Stream
        List<Integer> lists = Arrays.stream(intArray).map((a)->{
            return a+1;
        }).collect(Collectors.toList());
        assertIterableEquals(lists,Arrays.asList(2,3,4));
    }

    @Test
    public void testObjectArray2(){
        Integer[] intArray = new Integer[]{1,2,3};

        //用Stream.of来转换为Stream
        List<Integer> lists = Stream.of(intArray).map((a)->{
            return a+1;
        }).collect(Collectors.toList());
        assertIterableEquals(lists,Arrays.asList(2,3,4));
    }

    @Test
    public void testPrimitiveArray(){
        int[] intArray = new int[]{1,2,3};

        //需要加入box转换，否则会报错
        List<Integer> lists = Arrays.stream(intArray).map((a)->{
            return a+1;
        }).boxed().collect(Collectors.toList());
        assertIterableEquals(lists,Arrays.asList(2,3,4));
    }

    //使用Stream.of，转换int[]的时候，会报错，会转换为Stream<int[]>，而不是正确的Stream<int>流
    /*
    @Test
    public void testPrimitiveArray(){
        int[] intArray = new int[]{1,2,3};

        List<Integer> lists = Stream.of(intArray).map((a)->{
            return a+1;
        }).boxed().collect(Collectors.toList());
        assertIterableEquals(lists,Arrays.asList(2,3,4));
    }
     */
}
