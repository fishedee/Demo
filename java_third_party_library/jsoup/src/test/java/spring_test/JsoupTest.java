package spring_test;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.TextNode;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;

public class JsoupTest {
    @Test
    public void testBasic(){
        String xml = "<!doc html>" +
                "<html>" +
                "<head></head>" +
                "<body>" +
                "<h1>你好</h1>" +
                "</body>" +
                "</html>";
        Document document = Jsoup.parse(xml);
        String target = document.select("h1").text();
        assertEquals(target,"你好");
    }

    @Test
    public void testText(){
        String xml = "<!doc html>" +
                "<html>" +
                "<head></head>" +
                "<body>" +
                "<h1>用户：<span>mk</span>你好</h1>" +
                "</body>" +
                "</html>";
        Document document = Jsoup.parse(xml);
        //text方法会取自身，和子级所有的textNode
        String target = document.select("h1").text();
        assertEquals(target,"用户：mk你好");

        //textNodes方法只会取自身的textNode
        List<TextNode> textNodes = document.select("h1").textNodes();
        List<String> texts = textNodes.stream().map(single->{
            return single.getWholeText();
        }).collect(Collectors.toList());

        assertIterableEquals(texts, Arrays.asList("用户：","你好"));
    }

    @Test
    public void testSelect(){
        String xml = "<!doc html>" +
                "<html>" +
                "<head></head>" +
                "<body>" +
                "<h1>" +
                "<div class=\"u\">bb</div>"+
                "</h1>" +
                "<h1>" +
                "<div class=\"u\">cc</div>"+
                "</h1>" +
                "</body>" +
                "</html>";
        Document document = Jsoup.parse(xml);

        //select可以匹配多个
        Elements elements = document.select("h1 .u");
        List<String> nameList = elements.stream().map(single->{
            return single.text();
        }).collect(Collectors.toList());
        assertIterableEquals(nameList,Arrays.asList("bb","cc"));

        //匹配不到的时候，也是返回有对象的Elements，只是size为0而已，不会返回null
        Elements elements2 = document.select("h1 .uk");
        List<String> nameList2 = elements2.stream().map(single->{
            return single.text();
        }).collect(Collectors.toList());
        assertIterableEquals(nameList2,Arrays.asList());
    }

    @Test
    public void testSelectEq(){
        String xml = "<!doc html>" +
                "<html>" +
                "<head></head>" +
                "<body>" +
                "<h1>" +
                "<div class=\"u\">b1</div>"+
                "<div class=\"u\">b2</div>"+
                "<div class=\"u\">b3</div>"+
                "</h1>" +
                "<h1>" +
                "<div class=\"u\">c1</div>"+
                "<div class=\"u\">c2</div>"+
                "</h1>" +
                "<h1>" +
                "<div class=\"u\">d1</div>"+
                "<div>"+
                "<div class=\"u\">d2</div>"+
                "</div>"+
                "</h1>" +
                "</body>" +
                "</html>";
        Document document = Jsoup.parse(xml);

        //eq代表.u同级里面的第几个，注意下标从0开始
        Elements elements = document.select("h1 .u:eq(1)");
        List<String> nameList = elements.stream().map(single->{
            return single.text();
        }).collect(Collectors.toList());
        assertIterableEquals(nameList,Arrays.asList("b2","c2"));

        //匹配不到的时候，也会只返回1个
        Elements elements2 = document.select("h1 .u:eq(2)");
        List<String> nameList2 = elements2.stream().map(single->{
            return single.text();
        }).collect(Collectors.toList());
        assertIterableEquals(nameList2,Arrays.asList("b3"));
    }

    @Test
    public void testSelectInner(){
        String xml = "<!doc html>" +
                "<html>" +
                "<head></head>" +
                "<body>" +
                "<h1>" +
                "<div class=\"u\">b1</div>"+
                "<div class=\"u\">b2</div>"+
                "<div class=\"u\">b3</div>"+
                "</h1>" +
                "<h1>" +
                "<div class=\"u\">c1</div>"+
                "<div class=\"u\">c2</div>"+
                "</h1>" +
                "<h1>" +
                "<div class=\"u\">d1</div>"+
                "<div>"+
                "<div class=\"u\">d2</div>"+
                "<div class=\"g\">d3</div>"+
                "</div>"+
                "</h1>" +
                "</body>" +
                "</html>";
        Document document = Jsoup.parse(xml);

        //嵌套查询，可以拿到顶数据以后，嵌套往下查询
        Elements elements = document.select("h1:eq(2)");

        //这里匹配了2个Element，转换为text的时候，中间直接加空格
        String text1 = elements.select(".u").text();
        assertEquals(text1,"d1 d2");

        //匹配了1个Element
        String text2 = elements.select(".g").text();
        assertEquals(text2,"d3");
    }
}
