package annotation_test;

import org.springframework.beans.annotation.AnnotationBeanUtils;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.core.annotation.AnnotationUtils;

import java.util.Arrays;

@ChildAnnotation(path="/com/hello")
class MyUse{

}

public class App 
{
    public static void main( String[] args ) {
        //这个例子,演示了AliasFor对两个父子两个注解,通过子注解的字段,映射到父注解的字段.
        //注意用了AnnotatedElementUtils.findMergedAnnotation方法

        MyAnnotation4 annotation =  AnnotatedElementUtils.findMergedAnnotation(MyUse.class,MyAnnotation4.class);
        //MyUse只设置了ChildAnnotation的path字段,但是因为AliasFor,自动设置了MyAnnotation4的name字段
        System.out.println(annotation.name());
    }
}
