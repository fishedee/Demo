package spring_test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceA {
    private ServiceB serviceB;

    public void setServiceB(ServiceB serviceB){
        this.serviceB = serviceB;
    }
    public ServiceB getServiceB(){
        return this.serviceB;
    }
}
