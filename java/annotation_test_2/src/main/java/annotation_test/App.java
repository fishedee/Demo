package annotation_test;

import org.springframework.beans.annotation.AnnotationBeanUtils;
import org.springframework.core.annotation.AnnotationUtils;

import java.util.Arrays;

@CombineAnnotation
class MyUse{

}

public class App 
{
    public static void main( String[] args ) {
        MyAnnotation annotation =  AnnotationUtils.findAnnotation(MyUse.class,MyAnnotation.class);
        //查找子注解,要用Spring的AnnotationUtils方法
        //MyAnnotation annotation =  MyUse.class.getAnnotation(MyAnnotation.class);
        System.out.println(Arrays.toString(annotation.Import()));
        System.out.println(annotation.Name());

        MyAnnotation2 annotation2 = AnnotationUtils.findAnnotation(MyUse.class,MyAnnotation2.class);
        System.out.println(annotation2.value());
    }
}
