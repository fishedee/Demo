package spring_test6;

        import org.springframework.context.annotation.Import;
        import org.springframework.core.annotation.AliasFor;

        import java.lang.annotation.*;

/**
 * Created by fish on 2021/4/14.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(ImportMyRepositoryRegistrar.class)
public @interface EnableMyRepository {
    @AliasFor("basePackages")
    String[] value() default {};

    @AliasFor("value")
    String[] basePackages() default {};
}
