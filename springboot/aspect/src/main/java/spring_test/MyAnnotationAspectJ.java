package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class MyAnnotationAspectJ {

    @Before("@annotation(spring_test.MyAnnotation)")
    public void before(){
        log.info("before annotation...");
    }

    @After("@annotation(spring_test.MyAnnotation)")
    public void after(){
        log.info("after annotation...");
    }

    @Around("@annotation(spring_test.MyAnnotation)")
    public Object around(ProceedingJoinPoint joinPoint)throws Throwable{
        log.info("around 1 ");
        Object result = joinPoint.proceed();
        log.info("around 2");
        return result;
    }
}
