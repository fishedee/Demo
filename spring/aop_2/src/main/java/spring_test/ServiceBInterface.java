package spring_test;

/**
 * Created by fish on 2021/2/28.
 */
public class ServiceBInterface implements IServiceB {
    private ServiceB serviceB;
    public ServiceBInterface(){
        this.serviceB = new ServiceB();
        this.serviceB.setPlace("shanghai");
    }

    public void showPlace(){
        System.out.println("---- before around3 ---- ");
        this.serviceB.showPlace();
        System.out.println("---- after around3  ---- ");
    }
}
