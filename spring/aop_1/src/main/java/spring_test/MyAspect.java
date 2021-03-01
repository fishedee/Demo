package spring_test;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

/**
 * Created by fish on 2021/2/27.
 */
@Aspect
public class MyAspect {
    @Pointcut("execution( * *.showAnimal(..))")
    public void test(){

    }

    @Before("test()")
    public void beforeShowAnimal(){
        System.out.println("before test...");
    }

    @After("test()")
    public void afterShowAnimal(){
        System.out.println("after test...");
    }

    @Around("test()")
    public void aroundShowAnimal(ProceedingJoinPoint p) throws Throwable{
        System.out.println("before around");
        p.proceed();
        System.out.println("after around");
    }

}
