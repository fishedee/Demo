package spring_test;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

/**
 * Created by fish on 2021/2/27.
 */
@Aspect
public class MyAspect {
    @Pointcut("execution( * ServiceA.*(..))|| execution(* ServiceB.*(..)) || execution(* ServiceC.*(..))")
    public void test(){

    }

    @Around("test()")
    public Object aroundShowAnimal(ProceedingJoinPoint p) throws Throwable{
        System.out.println("---- before around ---- ");
        Object result = p.proceed();
        System.out.println("---- after around  ---- ");
        return result;
    }

}
