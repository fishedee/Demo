package spring_test;

import org.springframework.aop.ClassFilter;
import org.springframework.aop.MethodMatcher;
import org.springframework.aop.Pointcut;
import org.springframework.lang.Nullable;

import java.lang.reflect.Method;

/**
 * Created by fish on 2021/3/1.
 */
public class MyPointcut implements Pointcut,ClassFilter,MethodMatcher{
    public ClassFilter getClassFilter(){
        return this;
    }

    public MethodMatcher getMethodMatcher(){
        return this;
    }

    public boolean matches(Class<?> var1){
        //我们不采用类级别的检验
        return true;
    }

    public boolean matches(Method var1, @Nullable Class<?> var2){
        //我们检查方法上是否有@MyShow的注解
        MyShow showAnnotation = var1.getAnnotation(MyShow.class);
        return showAnnotation != null;
    }

    public boolean isRuntime(){
        //不采用动态的需要传入Object的检查
        return false;
    }

    public boolean matches(Method var1, @Nullable Class<?> var2, Object... var3){
        //不采用动态的需要传入Object的检查
        return false;
    }
}
