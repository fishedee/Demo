package spring_test5;

import java.lang.annotation.*;

/**
 * Created by fish on 2021/4/14.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MyComponent {
}
