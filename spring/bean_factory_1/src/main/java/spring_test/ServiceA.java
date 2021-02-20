package spring_test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceA {
    public String[] messages;

    public String gg = "";

    public ServiceA(){
    }

    public ServiceA(String message){
        this.messages = new String[]{message};
    }

    public ServiceA(String[] messages){
        this.messages = messages;
    }

    public void showMessage(){
        System.out.println("showMessage:"+Arrays.toString(this.messages)+gg.toString());
    }
}
