package spring_test;

import org.springframework.beans.factory.InitializingBean;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceB implements InitializingBean{
    public ServiceB(){
        System.out.println("serviceB constructor");
    }

    private String message;
    public void setMessage(String message){
        System.out.println("serviceB property inject");
        this.message = message;
    }

    //InitializingBean接口
    public void afterPropertiesSet() throws Exception{
        System.out.println("serviceB afterPropertiesSet");
    }

    //在xml指定的initMethod
    public void myInitMethod(){
        System.out.println("serviceB myInit Method");
    }

    public void showMessage(){
        System.out.println("serviceB showMessage:"+this.message);
    }
}
