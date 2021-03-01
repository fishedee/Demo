package spring_test;

import org.springframework.aop.framework.AopContext;

/**
 * Created by fish on 2021/3/1.
 */
public class ServiceA {

    @MyShow("mmk")
    public void go1(){
        System.out.println("I am go1 ... ");
    }

    public void go2(){
        System.out.println("I am go2 ... ");
    }
}
