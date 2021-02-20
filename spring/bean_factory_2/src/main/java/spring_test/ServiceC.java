package spring_test;

/**
 * Created by fish on 2021/2/20.
 */
public class ServiceC {
    private ServiceA serviceA;

    public void setServiceA(ServiceA serviceA){
        this.serviceA = serviceA;
    }

    public ServiceA getServiceA(){
        return this.serviceA;
    }
}
