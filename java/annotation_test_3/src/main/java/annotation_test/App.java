package annotation_test;

import org.springframework.beans.annotation.AnnotationBeanUtils;
import org.springframework.core.annotation.AnnotationUtils;

import java.util.Arrays;

@MyAnnotation3("fish1")
class MyUse{

}

@MyAnnotation3(name="fish2")
class MyUse2{

}

public class App 
{
    public static void main( String[] args ) {
        //这个例子,演示了AliasFor对两个不同名的字段,实现了两个字段互为别名的效果.

        MyAnnotation3 annotation =  AnnotationUtils.findAnnotation(MyUse.class,MyAnnotation3.class);
        //MyUse只设置了value,但是因为AliasFor,自动设置了name
        System.out.println(annotation.name());
        System.out.println(annotation.value());

        MyAnnotation3 annotation2 =  AnnotationUtils.findAnnotation(MyUse2.class,MyAnnotation3.class);
        //MyUse2只设置了name,但是因为AliasFor,自动设置了value
        System.out.println(annotation2.name());
        System.out.println(annotation2.value());
    }
}
