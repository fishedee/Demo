package annotation_test;

import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by fish on 2021/2/10.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@MyAnnotation4
public @interface ChildAnnotation {
    @AliasFor(annotation = MyAnnotation4.class,value="name")
    String path() default "";
}
