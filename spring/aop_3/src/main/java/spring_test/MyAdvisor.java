package spring_test;

import org.aopalliance.aop.Advice;
import org.springframework.aop.Advisor;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;

/**
 * Created by fish on 2021/3/1.
 */
public class MyAdvisor implements PointcutAdvisor {


    public Pointcut getPointcut(){
        return new MyPointcut();
    }

    public Advice getAdvice(){
        return new MyAdvise();
    }

    public boolean isPerInstance(){
        return true;
    }
}
