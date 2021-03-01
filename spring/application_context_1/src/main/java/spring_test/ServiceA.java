package spring_test;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceA {
    private String animal;

    public void setAnimal(String animal){
        this.animal = animal;
    }

    public void showAnimal(){
        System.out.println("animal:"+this.animal);
    }
}
