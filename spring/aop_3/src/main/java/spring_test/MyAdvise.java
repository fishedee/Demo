package spring_test;


import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.AfterReturningAdvice;
import org.springframework.aop.MethodBeforeAdvice;
import org.aopalliance.intercept.MethodInterceptor;
import java.lang.reflect.Method;
import org.springframework.aop.BeforeAdvice;
import org.springframework.lang.Nullable;


/**
 * Created by fish on 2021/3/1.
 */
public class MyAdvise implements MethodInterceptor,MethodBeforeAdvice,AfterReturningAdvice {

    public Object invoke(MethodInvocation var1) throws Throwable{
        System.out.println("--- myShow intercept begin ---");
        Object result = var1.proceed();
        System.out.println("--- myShow intercept end  ---");
        return result;
    }

    public void before(Method var1, Object[] var2, @Nullable Object var3) throws Throwable{
        System.out.println("--- myShow before  ---");
    }

    public void afterReturning(@Nullable Object var1, Method var2, Object[] var3, @Nullable Object var4) throws Throwable{
        System.out.println("--- myShow afterReturning ---");
    }
}
