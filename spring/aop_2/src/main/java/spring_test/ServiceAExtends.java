package spring_test;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.InitializingBean;

/**
 * Created by fish on 2021/2/28.
 */
public class ServiceAExtends extends ServiceA {

    private ServiceA serviceA;
    public ServiceAExtends() {
        this.serviceA = new ServiceA();
        this.serviceA.setAnimal("cat");
    }

    public String getAnimal(){
        System.out.println("---- before around2 ---- ");
        Object result = this.serviceA.getAnimal();
        System.out.println("---- after around2  ---- ");
        return (String)result;
    }

    public void showAnimal(){
        System.out.println("---- before around2 ---- ");
        this.serviceA.showAnimal();
        System.out.println("---- after around2  ---- ");
    }

    //finalShowAnimal的无法被覆写
    //finalShowAnimal的无法被覆写
    //privateShowAnimal的无法被覆写
}
