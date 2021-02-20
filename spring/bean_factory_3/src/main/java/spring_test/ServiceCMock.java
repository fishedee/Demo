package spring_test;

/**
 * Created by fish on 2021/2/20.
 */
public class ServiceCMock extends ServiceC{
    private ServiceC serviceC;

    public ServiceCMock(ServiceC serviceC){
        this.serviceC = serviceC;
    }
    public void work() {
        System.out.println("serviceC mock begin...");
        this.serviceC.work();
        System.out.println("serviceC mock end...");
    }
}
