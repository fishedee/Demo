package spring_test;

import org.springframework.aop.framework.AopContext;

/**
 * Created by fish on 2021/3/1.
 */
public class ServiceC {

    public void go1(){
        System.out.println("I am go1 begin ... ");
        go1_inner();
        System.out.println("I am go1 end ...");
    }

    public void go1_inner(){
        System.out.println("I am go1_inner ");
    }

    public void go2(){
        System.out.println("I am go2 begin ... ");
        ((ServiceC)AopContext.currentProxy()).go2_inner();
        System.out.println("I am go2 end ...");
    }

    public void go2_inner(){
        System.out.println("I am go2_inner ");
    }
}
