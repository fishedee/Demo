package spring_test;

import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

/**
 * Created by fish on 2021/4/14.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(ShowMsgSelector.class)
public @interface ShowMsg {
    String value() default "";
}
