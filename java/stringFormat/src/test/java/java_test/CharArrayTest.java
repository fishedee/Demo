package java_test;

import org.assertj.core.internal.Bytes;
import org.junit.jupiter.api.Test;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

//https://www.freesion.com/article/58792528/
//java与javascript都是UTF-16的方式存储字符串
//golang是以UTF-8的方式存储字符串
public class CharArrayTest {

    private Character[] getChar(String input){
        List<Character> input1Array = new ArrayList<>();
        for( int i = 0 ;i != input.length();i++){
            input1Array.add(input.charAt(i));
        }
        return input1Array.toArray(new Character[input1Array.size()]);
    }

    @Test
    public void testCharCodeAt() {
        //https://www.zhangshilong.cn/work/278178.html
        //char类型可以存储一个中文汉字。因为Java中char的编码方式为UTF-16BE。UTF-16编码使用2或者4字节，在65536以内的占两个字节。而基本上所有中文的Unicode编码在19968到40869之间——既Unicode至少包含了20902个汉字，所以一个char类型可以存储一个汉字。
        String input1 = "ab";
        Character[] input1Array = this.getChar(input1);
        assertArrayEquals(
                input1Array,
                new Character[]{'a','b'});
        assertEquals(input1Array.length,2);

        String input2 = "a你好";
        Character[] input2Array = this.getChar(input2);
        assertArrayEquals(
                input2Array,
                new Character[]{'a','你','好'});
        assertEquals(input2Array.length,3);

        String input3 = "a\uD83D\uDE00c";
        Character[] input3Array = this.getChar(input3);
        System.out.println(input3.length());
        assertArrayEquals(
                input3Array,
                new Character[]{'a',0xD83D,0xDE00,'c'});
        assertEquals(input3Array.length,4);
    }

    @Test
    public void testToCharArray() {
        String input1 = "ab";
        char[] input1Array = input1.toCharArray();
        assertArrayEquals(
                input1Array,
                new char[]{'a','b'});
        assertEquals(input1Array.length,2);

        String input2 = "a你好";
        char[] input2Array = input2.toCharArray();
        assertArrayEquals(
                input2Array,
                new char[]{'a','你','好'});
        assertEquals(input2Array.length,3);

        String input3 = "a\uD83D\uDE00c";
        char[] input3Array = input3.toCharArray();
        assertArrayEquals(
                input3Array,
                new char[]{'a',0xD83D,0xDE00,'c'});
        assertEquals(input3Array.length,4);
    }

    @Test
    public void testGetBytes(){
        String input1 = "ab";
        byte[] input1Array = input1.getBytes();
        assertArrayEquals(
                input1Array,
                new byte[]{'a','b'});
        assertEquals(input1Array.length,2);

        String input2 = "a你好";
        byte[] input2Array = input2.getBytes();
        assertArrayEquals(
                input2Array,
                new byte[]{'a',(byte)0xE4,(byte)0xBD,(byte)0xA0,(byte)0xE5,(byte)0xA5,(byte)0xBD});
        assertEquals(input2Array.length,7);

        String input3 = "a\uD83D\uDE00c";
        byte[] input3Array = input3.getBytes();
        assertArrayEquals(
                input3Array,
                new byte[]{'a',(byte)0xF0,(byte)0x9F,(byte)0x98,(byte)0x80,'c'});
        assertEquals(input3Array.length,6);
    }

    @Test
    public void testGetBytesUTF16()throws UnsupportedEncodingException {
        //https://www.haomeili.net/Code/DetailCodes?wd=%E4%BD%A0%E5%A5%BD
        //UTF-16LE，小端模式，无BOM头
        String input1 = "ab";
        byte[] input1Array = input1.getBytes("UTF-16LE");

        assertArrayEquals(
                input1Array,
                new byte[]{'a',0,'b',0});
        assertEquals(input1Array.length,4);

        String input2 = "a你好";
        byte[] input2Array = input2.getBytes("UTF-16LE");
        assertArrayEquals(
                input2Array,
                new byte[]{'a',0,(byte)0x60,(byte)0x4f,(byte)0x7D,(byte)0x59});
        assertEquals(input2Array.length,6);

        String input3 = "a\uD83D\uDE00c";
        byte[] input3Array = input3.getBytes("UTF-16LE");
        assertArrayEquals(
                input3Array,
                new byte[]{'a',0,(byte)0x3D,(byte)0xD8,(byte)0x00,(byte)0xDE,'c',0});
        assertEquals(input3Array.length,8);
    }

    @Test
    public void testToCodePoints() {
        String input1 = "ab";
        int[] input1Array = input1.codePoints().boxed()
                .mapToInt(Integer::valueOf)
                .toArray();
        assertArrayEquals(
                input1Array,
                new int[]{
                        'a',
                        'b'
                });
        assertEquals(input1Array.length,2);

        String input2 = "a你好";
        int[] input2Array = input2.codePoints().boxed()
                .mapToInt(Integer::valueOf)
                .toArray();
        assertArrayEquals(
                input2Array,
                new int[]{'a','你','好'});
        assertEquals(input2Array.length,3);

        //Unicode (UTF-32 Big-Endian)
        //https://www.haomeili.net/Code/DetailCodes?wd=%F0%9F%98%80
        String input3 = "a\uD83D\uDE00c";
        int[] input3Array = input3.codePoints().boxed()
                .mapToInt(Integer::valueOf)
                .toArray();
        assertArrayEquals(
                input3Array,
                new int[]{'a',0x01F600,'c'});
        assertEquals(input3Array.length,3);
    }
}
