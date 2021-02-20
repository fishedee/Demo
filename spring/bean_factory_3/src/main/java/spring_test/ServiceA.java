package spring_test;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.BeanNameAware;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceA implements BeanNameAware,BeanClassLoaderAware,BeanFactoryAware{
    private String animal;

    public void setAnimal(String animal){
        this.animal = animal;
    }

    //BeanNameAware接口
    private String beanName;
    public void setBeanName(String var1){
        this.beanName = var1;
    }

    //BeanClassLoaderAware接口
    private ClassLoader classLoader;
    public void setBeanClassLoader(ClassLoader var1){
        this.classLoader = var1;
    }

    //BeanFactoryAware接口
    private BeanFactory beanFactory;
    public void setBeanFactory(BeanFactory var1) throws BeansException{
        this.beanFactory = var1;
    }

    public void showAnimal(){
        System.out.println("beanFactory:"+this.beanFactory);
        System.out.println("classLoader:"+this.classLoader);
        System.out.println("beanName:"+this.beanName);
        System.out.println("animal:"+this.animal);
    }
}
