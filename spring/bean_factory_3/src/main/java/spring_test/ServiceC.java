package spring_test;

/**
 * Created by fish on 2021/2/20.
 */
public class ServiceC {
    private String person;

    public void setPerson(String person){
        this.person = person;
    }

    public void work(){
       System.out.println("serviceC : "+this.person+" is working");
    }
}
