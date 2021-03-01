package spring_test;

/**
 * Created by fish on 2021/2/28.
 */
public class ServiceB implements  IServiceB {

    private String place;

    public void setPlace(String place){
        this.place = place;
    }

    public void showPlace(){
        System.out.println("serviceB showPlace ref: "+ System.identityHashCode(this));
        System.out.println("serviceB place : "+this.place);
    }
}
