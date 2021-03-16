package spring_test3;

/**
 * Created by fish on 2021/3/15.
 */
public class ServiceF {
    private String tip;
    public ServiceF(String tip){
        this.tip = tip;
    }

    public void go(){
        System.out.println("serviceF go "+this.tip);
    }
}
