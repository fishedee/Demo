package java_standard_test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;

public class TestStream {
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
}
