package java_test;

import org.apache.logging.log4j.util.Strings;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SplitTest {
    @Test
    public void basic() {
        //以单个;分号为分割
        String input1 = "a;c";
        String[] input1Array = input1.split(";");
        assertArrayEquals(
                input1Array,
                new String[]{"a","c"});

        //以<>组合两个字符为分割
        String input2 = "a<>c<>ccc<k>e";
        String[] input2Array = input2.split("<>");
        assertArrayEquals(
                input2Array,
                new String[]{"a","c","ccc<k>e"});

        //以<或者>，任意一个字符为分割
        String input3 = "a<>c<>ccc<k>e";
        String[] input3Array = input3.split("<|>");
        assertArrayEquals(
                input3Array,
                new String[]{"a","","c","","ccc","k","e"});

    }
}
