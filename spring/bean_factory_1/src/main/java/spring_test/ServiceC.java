package spring_test;

/**
 * Created by fish on 2021/2/20.
 */
public class ServiceC implements IServiceC{
    private String animal = "";

    public ServiceC(String animal){
        this.animal = animal;
    }

    public void swim(){
        System.out.println("ServiceC swim:"+this.animal);
    }
}
