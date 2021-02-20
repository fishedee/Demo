package spring_test;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceB {
    private String animal;

    public void setAnimal(String animal){
        this.animal = animal;
    }

    public ServiceB(){

    }

    public void showAnimal(){
        System.out.println("showAnimal:"+this.animal);
    }
}
