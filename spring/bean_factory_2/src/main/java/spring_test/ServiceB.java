package spring_test;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceB {
    private ServiceC serviceC;

    public void setServiceC(ServiceC serviceC){
        this.serviceC = serviceC;
    }

    public ServiceC getServiceC(){
        return this.serviceC;
    }
}
