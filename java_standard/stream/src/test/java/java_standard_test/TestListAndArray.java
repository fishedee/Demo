package java_standard_test;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

public class TestListAndArray {

    @Test
    public void testCreateArray(){
        int[] intArray = new int[]{1,2,3};
        Integer[] intArray2 = new Integer[10];
        char[] charArray = new char[]{'a','b','c','d'};
        assertEquals(intArray.length,3);
        assertEquals(intArray2.length,10);
        assertEquals(charArray.length,4);
    }

    @Test
    public void testPrimitiveArrayToList(){
        int[] intArray = new int[]{1,2,3,4};
        List<Integer> intList1 = Arrays.stream(intArray)
                .boxed()
                .collect(Collectors.toList());
        assertEquals(intList1.toString(),
                Arrays.asList(1,2,3,4).toString());

        //这样做不行，只支持boxed Array
        //List<Integer> intList1 = Arrays.asList(intArray);

        //这样做也不行，只支持boxedArray
        //List<Integer> intList2 = new ArrayList<>();
        //Collections.addAll(intList2,intArray);
    }

    @Test
    public void testBoxedArrayToList(){
        Integer[] intArray = new Integer[]{1,2,3,4};
        List<Integer> intList1 = Arrays.asList(intArray);
        List<Integer> intList2 = new ArrayList<>(Arrays.asList(intArray));
        List<Integer> intList3 = Arrays.stream(intArray).collect(Collectors.toList());
        List<Integer> intList4 = Stream.of(intArray).collect(Collectors.toList());
        List<Integer> intList5 = new ArrayList<>();
        Collections.addAll(intList5,intArray);

        assertEquals(intList1.toString(),
                Arrays.asList(1,2,3,4).toString());
        assertEquals(intList2.toString(),
                Arrays.asList(1,2,3,4).toString());
        assertEquals(intList3.toString(),
                Arrays.asList(1,2,3,4).toString());
        assertEquals(intList4.toString(),
                Arrays.asList(1,2,3,4).toString());
        assertEquals(intList5.toString(),
                Arrays.asList(1,2,3,4).toString());
    }

    @Test
    public void testPrimitiveArrayToBoxedArray(){
        int[] intArray = new int[]{1,2,3,4};
        //stream的方法
        Integer[] intArray2 = Arrays.stream(intArray)
                .boxed()
                .toArray(Integer[]::new);

        //手工方法
        Integer[] intArray3 = new Integer[intArray.length];
        for( int i = 0 ;i != intArray.length;i++){
            intArray3[i] = intArray[i];
        }

        //对比
        for(int i = 0 ;i != intArray.length;i++){
            assertEquals(intArray[i],intArray2[i]);
            assertEquals(intArray[i],intArray3[i]);
        }
        assertEquals(intArray.length,intArray2.length);
        assertEquals(intArray.length,intArray3.length);
    }

    @Test
    public void testBoxedArrayToPrimitiveArray(){
        Integer[] intArray = new Integer[]{1,2,3,4};

        //stream方法，只支持mapToInt,mapToLong,mapToDouble
        int[] intArray2 = Arrays.stream(intArray)
                .mapToInt(Integer::valueOf)
                .toArray();

        //手工方法
        int[] intArray3 = new int[intArray.length];
        for( int i = 0 ;i != intArray.length;i++){
            intArray3[i] = intArray[i];
        }

        //对比
        for(int i = 0 ;i != intArray.length;i++){
            assertEquals(intArray[i],intArray2[i]);
            assertEquals(intArray[i],intArray3[i]);
        }
        assertEquals(intArray.length,intArray2.length);
        assertEquals(intArray.length,intArray3.length);
    }

    @Test
    public void testListToBoxedArray(){
        List<Integer> intList = Arrays.asList(1,2,3,4);
        Integer[] intArray = intList.stream().toArray(Integer[]::new);
        Integer[] intArray2 = intList.toArray(new Integer[0]);

        //对比
        for(int i = 0 ;i != intList.size();i++){
            assertEquals(intList.get(i),intArray[i]);
            assertEquals(intList.get(i),intArray2[i]);
        }
        assertEquals(intList.size(),intArray.length);
        assertEquals(intList.size(),intArray2.length);
    }

    @Test
    public void testListToPrimitiveArray(){
        List<Integer> intList = Arrays.asList(1,2,3,4);
        int[] intArray = intList.stream().mapToInt(Integer::valueOf).toArray();

        //对比
        for(int i = 0 ;i != intList.size();i++){
            assertEquals(intList.get(i),intArray[i]);
        }
        assertEquals(intList.size(),intArray.length);
    }
}
