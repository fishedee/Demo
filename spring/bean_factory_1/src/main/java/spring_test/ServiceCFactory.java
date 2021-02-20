package spring_test;

import org.springframework.beans.factory.FactoryBean;

/**
 * Created by fish on 2021/2/20.
 */
public class ServiceCFactory implements FactoryBean<ServiceC> {
    private String animal;

    public void setAnimal(String animal){
        this.animal = animal;
    }

    public ServiceC getObject(){
        System.out.println("Factory getBean serviceC");
        return new ServiceC(this.animal);
    }

    public Class<ServiceC> getObjectType(){
        return ServiceC.class;
    }

    public boolean isSingleton(){
        return true;
    }

}
